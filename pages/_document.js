import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return(
			<html>
				<Head>
					{/* Favicon */}
					<link rel="icon" href="/static/favicons/16.ico" size="16x16" />

					{/* CSS */}
					<link rel="stylesheet" href="/static/others/bootstrap/bootstrap.min.css" />
					<link rel="stylesheet" href="/static/css/main.css" />
				</Head>
				<body className="custom_class">
					<Main />

					<NextScript />
					{/* JavaScript (influential sequence) */}
					<script src="/static/others/bootstrap/jquery-3.3.1.slim.min.js"></script>
					<script src="/static/others/bootstrap/proper.min.js"></script>
					<script src="/static/others/bootstrap/bootstrap.min.js"></script>
					<script src="/static/others/fontawesome/fontawesome-all.js"></script>
				</body>
			</html>
		)
	}
}
