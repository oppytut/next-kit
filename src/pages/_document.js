import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet, injectGlobal } from 'styled-components';
import htmlescape from 'htmlescape';

const { NODE_ENV } = process.env;
const env = { NODE_ENV };

injectGlobal`
	@font-face {
		font-family: Flamenco-Regular;
		src: url('/static/fonts/Flamenco/Flamenco-Regular.ttf');
	}
	@font-face {
		font-family: NunitoSans-Regular;
		src: url('/static/fonts/NunitoSans/NunitoSans-Regular.ttf');
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
					<link rel="icon" href='/static/favicons/16.ico' size="16x16" />

					{/* CSS */}
					<link rel='stylesheet' href='/_next/static/style.css' />
					{styleTags}
				</Head>
				<body className="custom_class">
					<Main />
					<script dangerouslySetInnerHTML={{ __html: `__ENV__ = ${htmlescape(env)}` }} />

					<NextScript />
					{/* JavaScript (influential sequence) */}
				</body>
			</html>
		);
	}
}
