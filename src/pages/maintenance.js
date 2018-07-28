import Head from 'next/head';
import React from 'react';
import { Row, Col } from 'antd';

import style from '../styles/maintenance';

const Maintenance = () => (
	<div style={style.root}>
		<Head>
			<title>Petuah</title>
			{/* Favicon */}
			<link rel="icon" href='/static/favicons/16.ico' size="16x16" />
			{/* Add CSS here! */}
			{/* antd css */}
			<link rel='stylesheet' href='/_next/static/style.css' />
			{/* Add Script here! */}
		</Head>

		<Row
			type="flex"
			justify="center"
			align="middle"
			style={{ height: '100vh' }}
		>
			<Col xs={22} sm={19} md={16} lg={13} xl={10}>
				<img alt="" src="/static/images/maintenance.png" width="100%" />
			</Col>
		</Row>
	</div>
);

export default Maintenance;
