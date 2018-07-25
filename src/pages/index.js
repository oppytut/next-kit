import Head from 'next/head';
import React from 'react';
import { Row, Col, Icon } from 'antd';
import styled from 'styled-components';

import style from '../styles/index';

import QuoteList from '../containers/index/quoteList';

import TopMenu from '../components/index/topMenu';
import AddQuote from '../components/index/addQuote';

const Content = styled.div`
	min-height: 560px;
	padding-bottom: 10px;
	background: #f9f9f9;
`;

const Footer = styled.div`
	min-height: 50px;
	text-align: center;
	font-size: 12px;
	padding-top: 10px;
	border-top: 1px solid #e8e8e8;
`;

const LoveIcon = styled(Icon)`
	color: #ff06ee;
`;

const GithubLink = styled.a`
	text-decoration: none;
	color: ${style.root.color};

	&:hover {
		color: ${style.colorHover};
	}
`;

const Index = () => (
	<div style={style.root}>
		<Head>
			{/* Favicon */}
			<link rel="icon" href='/static/favicons/16.ico' size="16x16" />

			<title>Petuah</title>
		</Head>

		<div> {/* header */}
			<TopMenu />
		</div>

		<Content>
			<Row type="flex" justify="center">
				<Col xs={22} sm={19} md={16} lg={13} xl={10}>
					<AddQuote />
					<QuoteList />
				</Col>
			</Row>
		</Content>

		<Footer>
			Knitted with <LoveIcon type="heart" /> by <GithubLink href="https://github.com/oppytut" target="__blank"> Oppytut </GithubLink>
		</Footer>
	</div>
);

export default Index;
