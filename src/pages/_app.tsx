import App, { AppComponentContext, Container } from 'next/app';
import React from 'react';
import withApollo from '../withApollo';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { AppLayout } from '../layout/containers/app-layout/app-layout';
import { NextContext } from 'next';

interface Props {
	// tslint:disable-next-line:no-any
	apollo: ApolloClient<any>;
}

class MyApp extends App<Props> {
	static async getInitialProps({ Component, ctx }: AppComponentContext) {
		let pageProps: Partial<NextContext>;
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		pageProps = { query: ctx.query };
		return { pageProps };
	}

	render() {
		const { Component, pageProps, apollo } = this.props;
		return (
			<Container>
				<ApolloProvider client={apollo}>
					<AppLayout>
						<Component {...pageProps} />
					</AppLayout>
				</ApolloProvider>
			</Container>
		);
	}
}

export default withApollo(MyApp);
