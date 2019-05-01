import App, { AppComponentContext, Container } from 'next/app';
import React from 'react';
import { AppLayout } from '../layout/containers/app-layout/app-layout';
import { NextContext } from 'next';

class MyApp extends App {
	static async getInitialProps({ Component, ctx }: AppComponentContext) {
		let pageProps: Partial<NextContext>;
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		pageProps = { query: ctx.query };
		return { pageProps };
	}

	render() {
		const { Component, pageProps } = this.props;
		return (
			<Container>
				<AppLayout>
					<Component {...pageProps} />
				</AppLayout>
			</Container>
		);
	}
}

export default MyApp;
