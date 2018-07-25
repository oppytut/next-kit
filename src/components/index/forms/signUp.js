import React, { Component } from 'react'; // must be in scope
import { Form, Input, Icon, message } from 'antd';
import styled from 'styled-components';
import isEmpty from 'is-empty';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import mzLogger from '../../../helpers/mz-logger';

import style from '../../../styles/index';
import { formItem, formValidator } from './config/user';

import { signUp } from '../../../reducers/auth/action';

const log = mzLogger('SignUpForm');

const StyledFormItem = styled(Form.Item)`
	margin-top: 0px;
	margin-bottom: 10px;
`;

const EyeIcon = styled(Icon)`
	color: ${props => props.color};

	&:hover {
		color: ${style.colorHover};
	}
`;

class SignUpForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			user: {},
			errors: {},
			validateStatus: {},
			show: {
				password: false,
				passConfirm: false,
			},
		};
	}

	componentDidMount() {
		this.props.isDisSubmit(this.isDisSubmit());
	}

	changeValue(e) { // triggered on change
		const { value, name } = e.target;
		const { user, errors, validateStatus } = this.state;

		user[name] = value;
		delete errors[name];
		delete validateStatus[name];
		this.setState({ user, errors, validateStatus });
		this.props.isDisSubmit(this.isDisSubmit());
	}

	isDisSubmit() { // triggered on change
		const { user } = this.state;

		if (isEmpty(user)) return true;

		const items = [...formItem, 'passConfirm'];
		for (const item of items) {
			if (isEmpty(user[item])) return true;
		}

		return false;
	}

	clear() {
		this.setState({
			user: {},
			errors: {},
			validateStatus: {},
		});
		this.props.isDisSubmit(this.isDisSubmit());

		log.info('form cleared');
	}

	showHideItem(item) {
		const { show } = this.state;
		show[item] = !show[item];
		this.setState({ show });

		log.info(`${item} displayed, ${show[item]}`);
	}

	submit(e) {
		e.preventDefault(); // stop form event

		this.setState({ loading: true });

		const { user } = this.state;
		const { errors, validateStatus } = (user.password === user.passConfirm) ?
			formValidator(user) : {
				errors: { passConfirm: 'Password is not the same!' },
				validateStatus: { passConfirm: 'error' },
			};

		if (!isEmpty(errors)) {
			this.setState({
				loading: false,
				errors,
				validateStatus,
			});

			log.info('change errors and validateStatus state');
		} else {
			this.props.signUp(user)
				.then((res) => {
					message.success('Registration successful!');

					log.info('set success message, user created');
					this.setState({ loading: false });
					this.props.onFinish();
				})
				.catch((err) => {
					if (!isEmpty(err.errors)) {
						// form errors
						const items = [...formItem, 'passConfirm'];
						for (const item of items) {
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

					this.setState({ loading: false });

					log.info('set err response');
				});
		}
	}

	render() {
		const {
			user,
			errors,
			validateStatus,
			show,
		} = this.state;

		return (
			<Form id="signUpForm" onSubmit={this.submit.bind(this)}>
				<StyledFormItem
					validateStatus={validateStatus.email}
					help={errors.email}
					hasFeedback
				>
					<Input
						name="email"
						placeholder="Email"
						onChange={this.changeValue.bind(this)}
						value={user.email}
						prefix={<Icon type="mail" />}
					/>
				</StyledFormItem>
				<StyledFormItem
					validateStatus={validateStatus.username}
					help={errors.username}
					hasFeedback
				>
					<Input
						name="username"
						placeholder="Username"
						onChange={this.changeValue.bind(this)}
						value={user.username}
						prefix={<Icon type="user" />}
					/>
				</StyledFormItem>
				<StyledFormItem
					validateStatus={validateStatus.password}
					help={errors.password}
					hasFeedback
				>
					<Input
						name="password"
						placeholder="Password"
						onChange={this.changeValue.bind(this)}
						value={user.password}
						type={!show.password ? 'password' : 'text'}
						prefix={<Icon type="lock" />}
						suffix={<EyeIcon
							type={show.password ? 'eye' : 'eye-o'}
							onClick={this.showHideItem.bind(this, 'password')}
							color={show.password ? style.colorHover : ''}
						/>}
					/>
				</StyledFormItem>
				<StyledFormItem
					validateStatus={validateStatus.passConfirm}
					help={errors.passConfirm}
					hasFeedback
				>
					<Input
						name="passConfirm"
						placeholder="Confirm password ..."
						onChange={this.changeValue.bind(this)}
						value={user.passConfirm}
						type={!show.passConfirm ? 'password' : 'text'}
						prefix={<Icon type="lock" />}
						suffix={<EyeIcon
							type={show.passConfirm ? 'eye' : 'eye-o'}
							onClick={this.showHideItem.bind(this, 'passConfirm')}
							color={show.passConfirm ? style.colorHover : ''}
						/>}
					/>
				</StyledFormItem>
			</Form>
		);
	}
}

SignUpForm.propTypes = {
	signUp: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	signUp,
});

const ConnectedSignUpForm = connect(null, mapDispatchToProps)(SignUpForm);

export default ConnectedSignUpForm;
