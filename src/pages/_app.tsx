import App, { AppComponentContext, Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import withApollo from '../withApollo';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Auth0Provider } from '../authentication/react-auth0-wrapper';
import { config } from '../authentication/auth-config';
import { createGlobalStyle } from 'styled-components';
import { HOME_PAGE_URL } from 'src/shared/constants';

interface Props {
	// tslint:disable-next-line:no-any
	apollo: ApolloClient<any>;
}

const GlobalStyle = createGlobalStyle`
    body {
		margin: 0;
		background-color: #FAFAFA;
		font-family: 'Roboto', sans-serif;
    }
`;

class MyApp extends App<Props> {
	static async getInitialProps({ Component, ctx }: AppComponentContext) {
		let pageProps;

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
					<Auth0Provider
						domain={config.domain}
						client_id={config.clientId}
						redirect_uri={`${HOME_PAGE_URL}/callback`}
						leeway={60 * 3}
					>
						<Head>
							<title>Gourmetic</title>
						</Head>
						<GlobalStyle />
						<Component {...pageProps} />
					</Auth0Provider>
				</ApolloProvider>
			</Container>
		);
	}
}

export default withApollo(MyApp);
