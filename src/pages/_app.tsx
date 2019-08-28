import App, { AppComponentContext, Container } from 'next/app';
import React from 'react';
import withApollo from '../withApollo';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { AppLayout } from '../layout/containers/app-layout/app-layout.container';
import { Auth0Provider } from 'src/authentication/react-auth0-wrapper';
import { config } from '../authentication/auth-config';
import { NextContext } from 'next';

interface Props {
	// tslint:disable-next-line:no-any
	apollo: ApolloClient<any>;
}

// tslint:disable-next-line:no-any
const onRedirectCallback = (appState: any) => {
	window.history.replaceState(
		{},
		document.title,
		appState && appState.targetUrl
			? appState.targetUrl
			: window.location.pathname
	);
};

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
		const component = (
			<ApolloProvider client={apollo}>
				<AppLayout>
					<Component {...pageProps} />
				</AppLayout>
			</ApolloProvider>
		);

		return (
			<Container>
				{(process.browser && (
					<Auth0Provider
						domain={config.domain}
						client_id={config.clientId}
						redirect_uri={window.location.origin}
						onRedirectCallback={onRedirectCallback}
					>
						{component}
					</Auth0Provider>
				)) ||
					component}
			</Container>
		);
	}
}

export default withApollo(MyApp);
