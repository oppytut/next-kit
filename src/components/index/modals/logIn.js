import React, { Component } from 'react'; // must be in scope
import { Modal, Button } from 'antd';
// import mzLogger from '../libs/mz-logger';

import LogInForm from '../forms/logIn';

// const log = mzLogger('LogInModal');

class LogInModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isDisSubmit: true,
		};
	}

	close() { // execute props
		this.disableSubmit(true);
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
					title="Log In"
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
							form="logInForm"
							htmlType="submit"
							disabled={isDisSubmit}
						>
							Log In
						</Button>,
					]}
				>
					<LogInForm
						isDisSubmit={this.disableSubmit.bind(this)}
						onFinish={this.close.bind(this)}
					/>
				</Modal>
			</React.Fragment>
		);
	}
}

export default LogInModal;
