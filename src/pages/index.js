import Head from 'next/head';
import React from 'react';
import { Row, Col, Icon } from 'antd';
import styled from 'styled-components';

import style from './style';

import QuoteList from '../containers/quoteList';

import TopMenu from '../components/topMenu';
import NewQuote from '../components/newQuote';

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
	color: ${style.body.color}
`;

const Index = () => (
	<React.Fragment>
		<Head>
			<title>Petuah</title>
		</Head>

		<div> {/* header */}
			<TopMenu />
		</div>

		<Content>
			<Row type="flex" justify="center">
				<Col xs={22} sm={19} md={16} lg={13} xl={10}>
					<NewQuote />
					<QuoteList />
				</Col>
			</Row>
		</Content>

		<Footer>
			Knitted with <LoveIcon type="heart" /> by <GithubLink href="https://github.com/oppytut" target="__blank"> Oppytut </GithubLink>
		</Footer>
	</React.Fragment>
);

export default Index;
