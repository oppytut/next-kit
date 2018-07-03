import React, { Component } from 'react'; // must be in scope
import { Modal, Button } from 'antd';
// import mzLogger from '../../libs/mz-logger';

import SignUpForm from '../forms/signUp';

// const log = mzLogger('SignUpModal');

class SignUpModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isDisSubmit: true,
		};
	}

	close() { // execute props
		this.props.onClose();
	}

	disableSubmit(v) { // triggered on change
		this.setState({ isDisSubmit: v });
	}

	render() {
		const { isDisSubmit } = this.state;
		const { visible } = this.props;

		return (
			<React.Fragment>
				<Modal
					title="Sign Up"
					visible={visible}
					onCancel={this.close.bind(this)}
					destroyOnClose
					footer={[
						<Button
							key="close"
							type="default"
							onClick={this.close.bind(this)}
						>
							Cancel
						</Button>,
						<Button
							key="submit"
							type="primary"
							form="signUpForm"
							htmlType="submit"
							disabled={isDisSubmit}
						>
							Sign Up
						</Button>,
					]}
				>
					<SignUpForm
						isDisSubmit={this.disableSubmit.bind(this)}
						onFinish={this.close.bind(this)}
					/>
				</Modal>
			</React.Fragment>
		);
	}
}

export default SignUpModal;
