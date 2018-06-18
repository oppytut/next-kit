import Head from 'next/head';
import React from 'react';
import { Row, Col, Icon } from 'antd';
import styled from 'styled-components';

import style from './style';

import TopMenu from '../components/topMenu';
import Post from '../components/post';

const StyledContent = styled.div`
	min-height: 560px;
	padding-top: 10px;
	padding-bottom: 10px;
	background: #f9f9f9;
`;

const StyledFooter = styled.div`
	min-height: 50px;
	text-align: center;
	font-size: 12px;
	padding-top: 10px;
	border-top: 1px solid #e8e8e8;
`;

const Index = () => (
	<React.Fragment>
		<Head>
			<title>Petuah</title>
		</Head>

		<div> {/* header */}
			<TopMenu />
		</div>

		<StyledContent>
			<Row type="flex" justify="center">
				<Col xs={22} sm={19} md={16} lg={13} xl={10}>
					<Post />
				</Col>
			</Row>
		</StyledContent>

		<StyledFooter>
			Knitted with <Icon type="heart" style={{
				color: '#ff06ee'
			}} /> by <a href="https://github.com/oppytut" target="__blank" style={{
				textDecoration: 'none',
				color: style.body.color
			}}> Oppytut </a>
		</StyledFooter>
	</React.Fragment>
);

export default Index;
