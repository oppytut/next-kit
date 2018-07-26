import React, { Component } from 'react'; // must be in scope
import { Form, Input, Icon, message } from 'antd';
import styled from 'styled-components';
import isEmpty from 'is-empty';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import mzLogger from '../../../helpers/mz-logger';

import style from '../../../styles/index';
import { formItem, formValidator } from './config/user';

import { logIn } from '../../../reducers/auth/action';

const log = mzLogger('LogInForm');

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

class LogInForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			user: {},
			errors: {},
			validateStatus: {},
			show: {
				password: false,
			},
			type: 'email',
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
		const { user, type } = this.state;

		if (isEmpty(user)) return true;

		const items = formItem.filter(i => i !== ((type === 'email') ? 'username' : 'email'));
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

	changeType(type) {
		const { user } = this.state;
		const delItem = (type === 'email') ? 'username' : 'email'; // i don't know, but error when change 'email' to type

		user[type] = user[delItem];
		delete user[delItem];
		this.setState({ user, type });

		log.info(`change type state to ${type} ${JSON.stringify(this.state.user)}`);
	}

	submit(e) {
		e.preventDefault(); // stop form event

		this.setState({ loading: true });

		const { user, type } = this.state;
		const { errors, validateStatus } = formValidator(user);
		const delItem = (type === 'email') ? 'username' : 'email';

		delete errors[delItem];
		delete validateStatus[delItem];

		if (!isEmpty(errors)) {
			this.setState({
				loading: false,
				errors,
				validateStatus,
			});

			log.info('change errors and validateStatus state');
		} else {
			this.props.logIn(user)
				.then(() => {
					message.success('Login successful!');

					log.info('set success message, login');
					this.setState({ loading: false });
					this.props.onFinish();
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
			type,
		} = this.state;

		return (
			<Form id="logInForm" onSubmit={this.submit.bind(this)}>
				{type === 'email' ? (
					<StyledFormItem
						validateStatus={validateStatus.content}
						help={errors.content}
						hasFeedback
					>
						<Input
							name="email"
							placeholder="Email"
							onChange={this.changeValue.bind(this)}
							value={user.email}
							prefix={<Icon type="mail" />}
							suffix={<a
								rel="noopener noreferrer"
								onClick={this.changeType.bind(this, 'username')}
							>
								Use username instead
							</a>}
						/>
					</StyledFormItem>
				) : type === 'username' && (
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
							suffix={<a
								rel="noopener noreferrer"
								onClick={this.changeType.bind(this, 'email')}
							>
								Use email instead
							</a>}
						/>
					</StyledFormItem>
				)}
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
							color={show.password && style.colorHover}
						/>}
					/>
				</StyledFormItem>
			</Form>
		);
	}
}

LogInForm.propTypes = {
	logIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	logIn: data => logIn(data, dispatch),
});

const ConnectedLogInForm = connect(null, mapDispatchToProps)(LogInForm);

export default ConnectedLogInForm;
