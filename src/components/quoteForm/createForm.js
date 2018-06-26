import React, { Component } from 'react'; // must be in scope
import { Form, Input, Button, message } from 'antd';
import styled from 'styled-components';
import isEmpty from 'is-empty';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import mzLogger from '../../libs/mz-logger';

import { addQuote, postQuote } from '../../reducers/quote/action';

import {
	formRules,
	formValidator,
} from './.config';

const log = mzLogger('CreateQuoteForm');

const { TextArea } = Input;

const StyledFormItem = styled(Form.Item)`
	margin-top: 10px;
	margin-bottom: 0px;
`;

const ContentInput = styled(TextArea)`
	resize: none;
`;

class CreateQuoteForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quote: {},
			errors: {},
			validateStatus: {},
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
						validateStatus: {},
					});
					message.success('Quote successfully published!');
					log.info('set success message, create quote');
				})
				.catch((err) => {
					log.info('set errors');
					// form errors
					for (const item of Object.getOwnPropertyNames(formRules)) {
						errors[item] = err.errors[item].message;
						validateStatus[item] = 'error';
					}
					if (!isEmpty(err.message)) message.error(err.message); // global err
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
						Publish
					</Button>
				</StyledFormItem>
			</Form>
		);
	}
}

CreateQuoteForm.propTypes = {
	addQuote: PropTypes.func.isRequired,
	postQuote: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	addQuote: quote => dispatch(addQuote(quote)),
	postQuote,
});

const ConnectedCreateQuoteForm = connect(null, mapDispatchToProps)(CreateQuoteForm);

export default ConnectedCreateQuoteForm;
