import Head from 'next/head';
import React, { Component } from 'react'; // Must be in scope
import { Row, Col } from 'antd';
import TopMenu from '../components/topMenu';

class Header extends Component {
	render() {
		return (
			<React.Fragment>
				<TopMenu />
			</React.Fragment>
		);
	}
}

class Content extends Component {
	render() {
		return (
			<React.Fragment>
				Contents
			</React.Fragment>
		);
	}
}

class Footer extends Component {
	render() {
		return (
			<React.Fragment>
				Footer
			</React.Fragment>
		);
	}
}

class Index extends Component {
	render() {
		return (
			<React.Fragment>
				<Head>
					<title>Lackon - Create your to-do list!</title>
				</Head>

				<Row> {/* header */}
					<Col span={24}>
						<Header />
					</Col>
				</Row>

				<Row type="flex" justify="center"> {/* content */}
					<Col span={12}>
						<Content />
					</Col>
				</Row>

				<Row> {/* footer */}
					<Col span={24}>
						<Footer />
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}

export default Index;
