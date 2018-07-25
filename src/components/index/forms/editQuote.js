import React, { Component } from 'react'; // must be in scope
import { Form, Input, Button, message } from 'antd';
import styled from 'styled-components';
import isEmpty from 'is-empty';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import mzLogger from '../../../helpers/mz-logger';

import { updateQuote, putQuote } from '../../../reducers/quote/action';

import {
	formItem,
	formValidator,
} from './config/quote';

const log = mzLogger('EditQuoteForm');

const { TextArea } = Input;

const StyledFormItem = styled(Form.Item)`
	margin-top: 10px;
	margin-bottom: 0px;
`;

const ContentInput = styled(TextArea)`
	resize: none;
`;

const CancelButton = styled(Button)`
	margin-left: 5px;
`;

class EditQuoteForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			quote: {},
			errors: {},
			validateStatus: {},
		};
	}

	componentDidMount() {
		const { content, inventor, id } = this.props;
		this.setState({ quote: { content, inventor, id } });
	}

	changeEditMode(edit) {
		this.props.isEditMode(edit);
	}

	changeValue(e) { // triggered on change
		const { value, name } = e.target;
		const { quote, errors, validateStatus } = this.state;

		quote[name] = value;
		delete errors[name];
		delete validateStatus[name];
		this.setState({ quote, errors, validateStatus });
	}

	isDisSubmit() { // triggered on change
		const { quote } = this.state;

		if (isEmpty(quote)) return true;

		for (const item of formItem) {
			if (isEmpty(quote[item])) return true;
		}

		return false;
	}

	clear() {
		this.setState({
			quote: {},
			errors: {},
			validateStatus: {},
		});

		log.info('form cleared');
	}

	submit() {
		this.setState({ loading: true });

		const { quote } = this.state;
		const { errors, validateStatus } = formValidator(quote);

		if (!isEmpty(errors)) {
			this.setState({
				loading: false,
				errors,
				validateStatus,
			});

			log.info('change errors and validateStatus state');
		} else {
			this.props.putQuote(quote)
				.then((res) => {
					this.props.updateQuote(res.quote);
					this.clear();
					message.success('Quote successfully updated!');
					this.changeEditMode(false);

					log.info('set success message, quote updated');
				})
				.catch((err) => {
					if (!isEmpty(err.errors)) {
						// form errors
						for (const item of formItem) {
							if (!isEmpty(err.errors[item])) {
								errors[item] = err.errors[item].message;
								validateStatus[item] = 'error';
							}
						}
						this.setState({ errors, validateStatus });
					} else if (!isEmpty(err.message)) {
						// global err
						message.error(err.message);
					}

					log.info('set err response');
				})
				.finally(() => {
					this.setState({ loading: false });
				});
		}
	}

	render() {
		const {
			loading,
			quote,
			errors,
			validateStatus,
		} = this.state;

		return (
			<Form>
				<StyledFormItem
					validateStatus={validateStatus.content}
					help={errors.content}
					hasFeedback
				>
					<ContentInput
						name="content"
						placeholder="Add quote ..."
						autosize={{ minRows: 2 }}
						style={{ resize: 'none' }}
						onChange={this.changeValue.bind(this)}
						value={quote.content}
						disabled={loading}
					/>
				</StyledFormItem>
				<StyledFormItem
					validateStatus={validateStatus.inventor}
					help={errors.inventor}
					hasFeedback
				>
					<Input
						name="inventor"
						placeholder="Inventor"
						onChange={this.changeValue.bind(this)}
						value={quote.inventor}
						disabled={loading}
					/>
				</StyledFormItem>
				<StyledFormItem>
					<Button
						type="primary"
						onClick={this.submit.bind(this)}
						disabled={this.isDisSubmit()}
						loading={loading}
					>
						Save
					</Button>
					<CancelButton
						type="normal"
						onClick={this.changeEditMode.bind(this, false)}
					>
						Cancel
					</CancelButton>
				</StyledFormItem>
			</Form>
		);
	}
}

EditQuoteForm.propTypes = {
	updateQuote: PropTypes.func.isRequired,
	putQuote: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	updateQuote: quote => dispatch(updateQuote(quote)),
	putQuote,
});

const ConnectedEditQuoteForm = connect(null, mapDispatchToProps)(EditQuoteForm);

export default ConnectedEditQuoteForm;
