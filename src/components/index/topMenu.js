import React, { Component } from 'react'; // must be in scope
import { Menu, Icon, message } from 'antd';
import styled from 'styled-components';
import isEmpty from 'is-empty';
import { connect } from 'react-redux';

import mzLogger from '../../helpers/mz-logger';

import style from '../../styles/index';

import LogInModal from './modals/logIn';
import SignUpModal from './modals/signUp';

import { logOut } from '../../reducers/auth/action';

const log = mzLogger('TopMenu');

const StyledMenu = styled(Menu)`
	font-family: ${style.root.fontFamily};
	font-size: 14px;
`;

const MenuLogo = styled.img`
	margin-right: 5px;
`;

class TopMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			current: 'home',
		};
	}

	changeCurrent(e) {
		this.setState({ current: e.key });

		switch (e.key) {
		case 'logOut':
			this.props.logOut();
			message.success('Logout successful!');
			break;
		default:
		}

		log.info(`change current state to ${e.key}`);
	}

	activeHome() {
		this.setState({ current: 'home' });

		log.info('change current state to home');
	}

	render() {
		const { current } = this.state;
		const { isAuthenticated, user } = this.props.auth;
		const { username } = !isEmpty(user) && user;

		const HomeItem = (
			<Menu.Item key="home">
				<MenuLogo src="/static/icons/24.png" alt="" />Petuah
			</Menu.Item>
		);

		const SignUpItem = (
			<Menu.Item key="signUp" style={{
				float: 'right',
			}}>
				Sign Up
			</Menu.Item>
		);

		const LogInItem = (
			<Menu.Item key="logIn" style={{
				float: 'right',
			}}>
				Log In
			</Menu.Item>
		);

		const AccountItem = (
			<Menu.SubMenu
				key="account"
				style={{
					float: 'right',
				}}
				title={
					<React.Fragment>
						<Icon type="user" />
						{username}
					</React.Fragment>
				}
			>
				<Menu.Item key="logOut">
					Log Out
				</Menu.Item>
			</Menu.SubMenu>
		);

		return (
			<React.Fragment>
				<LogInModal
					visible={(current === 'logIn')}
					onClose={this.activeHome.bind(this)}
				/>
				<SignUpModal
					visible={(current === 'signUp')}
					onClose={this.activeHome.bind(this)}
				/>
				<StyledMenu
					mode="horizontal"
					selectedKeys={[current]}
					onClick={this.changeCurrent.bind(this)}
				>
					{HomeItem}
					{isAuthenticated ? ([AccountItem]) : ([SignUpItem, LogInItem])}
				</StyledMenu>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
	logOut: () => logOut(dispatch),
});

const ConnectedTopMenu = connect(mapStateToProps, mapDispatchToProps)(TopMenu);

export default ConnectedTopMenu;
