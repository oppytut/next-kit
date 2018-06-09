import React, { Component } from 'react'; // Must be in scope
import { Menu } from 'antd';
import mzLogger from '../src/libs/mz-logger';
import bodyStyle from '../pages/bodyStyle';
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
		log.info('current state change to', e.key);
	}

	render() {
		const { current } = this.state;

		return (
			<React.Fragment>
				<Menu mode="horizontal" selectedKeys={[current]} onClick={this.handleClick.bind(this)} style={{
					fontFamily: bodyStyle.fontFamily,
					fontSize: '14px'
				}}>
					<Menu.Item key="home">
						<img src={MenuLogo} alt="" style={{
							marginRight: '5px'
						}} />
						Petuah
					</Menu.Item>
					<Menu.Item key="signUp" style={{
						float: 'right'
					}}>
						Sign Up
					</Menu.Item>
					<Menu.Item key="logIn" style={{
						float: 'right'
					}}>
						Log In
					</Menu.Item>
				</Menu>
			</React.Fragment>
		);
	}
}

export default TopMenu;
