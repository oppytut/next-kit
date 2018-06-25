import React, { Component } from 'react'; // must be in scope
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import isEmpty from 'is-empty';
import validator from 'validator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import mzLogger from '../libs/mz-logger';
import removePunctuation from '../libs/remove-punctuation';
import validateWithMongoose from '../libs/validate-with-mongoose';

import { addQuote, postQuote } from '../reducers/quote/action';

const log = mzLogger('NewQuote');

const { TextArea } = Input;

const StyledFormItem = styled(Form.Item)`
	margin-top: 10px;
	margin-bottom: 0px;
`;

const ContentInput = styled(TextArea)`
	resize: none;
`;

const formSanitizer = {
	content: (unsanitized) => {
		let item = unsanitized;

		if (isEmpty(item)) return undefined;

		item = validator.ltrim(item, [' ', '.']); // remove space and dot on the left
		item = validator.rtrim(item, [' ', '.']); // remove space and dot on the right
		item += '.'; // last charater is dot
		item = item.charAt(0).toUpperCase() + item.slice(1); // change fist character to uppercase

		log.info('return sanitized content');
		return item;
	},
	inventor: (unsanitized) => {
		let item = unsanitized;

		if (isEmpty(item)) return undefined;

		item = validator.ltrim(item, [' ', '.']); // remove space and dot on the left
		item = validator.rtrim(item, [' ', '.']); // remove space and dot on the right
		item = item.charAt(0).toUpperCase() + item.slice(1); // change fist character to uppercase

		log.info('return sanitized inventor');
		return item;
	}
};

const formRules = {
	content: {
		required: [true, 'Can not be empty!'],
		validate: [
			{
				validator: (v) => {
					let word = v;
					word = removePunctuation(word);
					const isValid = validator.isAlphanumeric(word);

					log.info(`return content validation result, ${isValid}`);
					return isValid;
				},
				message: 'Must only use letters, numbers, spaces, and punctuation!'
			},
			{
				validator: (v) => {
					const isValid = validator.isLength(v, { min: 10, max: 100 });

					log.info(`return content validation length result, ${isValid}`);
					return isValid;
				},
				message: 'Must be between 10 and 100 characters!'
			}
		]
	},
	inventor: {
		required: [true, 'Can not be empty!'],
		validate: [
			{
				validator: (v) => {
					let word = v;
					word = removePunctuation(word);
					const isValid = validator.isAlphanumeric(word);

					log.info(`return inventor validation result, ${isValid}`);
					return isValid;
				},
				message: 'Must only use letters, numbers, spaces, and punctuation!'
			},
			{
				validator: (v) => {
					const isValid = validator.isLength(v, { min: 5, max: 30 });

					log.info(`return content validation length result, ${isValid}`);
					return isValid;
				},
				message: 'Must be between 5 and 20 characters!'
			}
		]
	}
};

const formValidator = (quote) => {
	const errors = {};
	const validateStatus = {};

	// get errors message
	for (const item of Object.getOwnPropertyNames(formRules)) {
		errors[item] = validateWithMongoose(formSanitizer[item](quote[item]), formRules[item], item);
		if (isEmpty(errors[item])) {
			delete errors[item]; // remove undefined errors message
		} else {
			validateStatus[item] = 'error';
		}
	}

	log.info('return form errors and status value', { errors, validateStatus });
	return { errors, validateStatus };
};

class QuoteForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quote: {},
			errors: {},
			validateStatus: {}
		};
	}

	changeContent(e) { // triggered on change
		const { value } = e.target;
		const { quote, errors, validateStatus } = this.state;

		quote.content = value;
		delete errors.content;
		delete validateStatus.content;
		this.setState({ quote, errors, validateStatus });
	}

	changeInventor(e) { // triggered on change
		const { value } = e.target;
		const { quote, errors, validateStatus } = this.state;

		quote.inventor = value;
		delete errors.inventor;
		delete validateStatus.inventor;
		this.setState({ quote, errors, validateStatus });
	}

	isSubmitDisabled() { // triggered on change
		const { quote } = this.state;

		if (isEmpty(quote)) return true;

		for (const item of Object.getOwnPropertyNames(formRules)) {
			if (isEmpty(quote[item])) return true;
		}

		return false;
	}

	submit() {
		const { quote } = this.state;

		const { errors, validateStatus } = formValidator(quote);

		if (!isEmpty(errors)) {
			log.info('change errors and validateStatus state');
			this.setState({ errors, validateStatus });
		} else {
			this.props.postQuote(quote)
				.then((res) => {
					this.props.addQuote(res.quote);
					this.setState({
						quote: {},
						errors: {},
						validateStatus: {}
					});
					log.info('submitted');
				})
				.catch((err) => {
					log.info('set errors');
					for (const item of Object.getOwnPropertyNames(formRules)) {
						errors[item] = err.errors[item].message;
						validateStatus[item] = 'error';
					}
					this.setState({ errors, validateStatus });
				});
		}
	}

	render() {
		const { quote, errors, validateStatus } = this.state;

		return (
			<Form>
				<StyledFormItem
					validateStatus={validateStatus.content}
					help={errors.content}
					hasFeedback
				>
					<ContentInput
						placeholder="Add quote ..."
						autosize={{ minRows: 2 }}
						style={{ resize: 'none' }}
						onChange={this.changeContent.bind(this)}
						value={quote.content}
					/>
				</StyledFormItem>
				<StyledFormItem
					validateStatus={validateStatus.inventor}
					help={errors.inventor}
					hasFeedback
				>
					<Input
						placeholder="Inventor"
						onChange={this.changeInventor.bind(this)}
						value={quote.inventor}
					/>
				</StyledFormItem>
				<StyledFormItem>
					<Button
						type="primary"
						onClick={this.submit.bind(this)}
						disabled={this.isSubmitDisabled()}
					>
						Add
					</Button>
				</StyledFormItem>
			</Form>
		);
	}
}

QuoteForm.propTypes = {
	addQuote: PropTypes.func.isRequired,
	postQuote: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
	addQuote: quote => dispatch(addQuote(quote)),
	postQuote
});

const ConnectedQuoteForm = connect(null, mapDispatchToProps)(QuoteForm);

export default ConnectedQuoteForm;
