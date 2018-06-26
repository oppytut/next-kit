import React, { Component } from 'react'; // must be in scope
import { Menu } from 'antd';
import styled from 'styled-components';

import mzLogger from '../libs/mz-logger';

import style from '../pages/style';

import logo24 from '../static/icons/24.png';

const log = mzLogger('TopMenu');

const StyledMenu = styled(Menu)`
	font-family: ${style.body.fontFamily};
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

	handleClick(e) {
		log.info('change current state to', e.key);
		this.setState({ current: e.key });
	}

	render() {
		const { current } = this.state;

		return (
			<React.Fragment>
				<StyledMenu mode="horizontal" selectedKeys={[current]} onClick={this.changeCurrent.bind(this)}>
					<Menu.Item key="home">
						<MenuLogo src={logo24} alt="" />Petuah
					</Menu.Item>
					<Menu.Item key="signUp" style={{
						float: 'right',
					}}>
						Sign Up
					</Menu.Item>
					<Menu.Item key="logIn" style={{
						float: 'right',
					}}>
						Log In
					</Menu.Item>
				</StyledMenu>
			</React.Fragment>
		);
	}
}

export default TopMenu;
