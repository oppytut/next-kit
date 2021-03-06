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
					{styleTags}
					{/* Add CSS here! */}
					{/* Add Script here! */}
				</Head>

				<body className="custom_class">
					<Main />
					<script dangerouslySetInnerHTML={{ __html: `__ENV__ = ${htmlescape(env)}` }} />

					<NextScript />
					{/* Add Script here! (influential sequence) */}
				</body>
			</html>
		);
	}
}
