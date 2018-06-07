import React, { Component } from 'react'; // Must be in scope
import { Menu, Icon } from 'antd';
import mzLogger from '../libs/mz-logger';
import MenuLogo from '../static/icons/24.png';

const log = mzLogger('TopMenu');

class TopMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			current: 'home'
		};
	}

	handleClick(e) {
		this.setState({ current: e.key });
	}

	render() {
		const { current } = this.state;

		return (
			<React.Fragment>
				<Menu mode="horizontal" selectedKeys={[current]} onClick={this.handleClick.bind(this)}>
					<Menu.Item key="home">
						<img src={MenuLogo} alt="" style={{ marginRight: '5px' }} />
						Lackon
					</Menu.Item>
					<Menu.Item key="signUp" style={{ float: 'right' }}>
						Sign Up
					</Menu.Item>
					<Menu.Item key="logIn" style={{ float: 'right' }}>
						Log In
					</Menu.Item>
				</Menu>
			</React.Fragment>
		);
	}
}

export default TopMenu;
