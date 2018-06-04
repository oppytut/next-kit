import App, { Container } from 'next/app';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension'; // development mode
import thunk from 'redux-thunk';
import reducer from '../reducers';

const makeStore = (initialState, options) => createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {
		let pageProps = {};
		if(Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		return { pageProps };
	}

	render() {
		const { Component, pageProps, store } = this.props;
		return (
			<Container>
				<Provider store={ store }>
					<Component {...pageProps} />
				</Provider>
			</Container>
		);
	}
}

export default withRedux(makeStore)(MyApp);
