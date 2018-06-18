import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet, injectGlobal } from 'styled-components';

import NunitoSansFont from '../static/fonts/NunitoSans/NunitoSans-Regular.ttf';
import Favicon16 from '../static/favicons/16.ico';

import style from './style';

injectGlobal`
	@font-face {
		font-family: NunitoSans-Regular;
		src: url('${NunitoSansFont}');
	}
`;

export default class MyDocument extends Document {
	static getInitialProps({ renderPage }) {
		const sheet = new ServerStyleSheet();
		const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
		const styleTags = sheet.getStyleElement();
		return { ...page, styleTags };
	}

	render() {
		const { styleTags } = this.props;

		return (
			<html>
				<Head>
					{/* Favicon */}
					<link rel="icon" href={Favicon16} size="16x16" />

					{/* CSS */}
					<link rel='stylesheet' href='/_next/static/style.css' />
					{styleTags}
				</Head>
				<body className="custom_class" style={style.body}>
					<Main />

					<NextScript />
					{/* JavaScript (influential sequence) */}
				</body>
			</html>
		);
	}
}
