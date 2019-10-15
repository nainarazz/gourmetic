import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { getToken } from './authentication/react-auth0-wrapper';
import { graphqlEnpointDev, graphqlEnpointProd } from './config';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withApollo } from 'next-with-apollo';

export default withApollo(({ ctx, headers, initialState }) => {
	const httpLink = createUploadLink({
		uri:
			process.env.NODE_ENV === 'development'
				? graphqlEnpointDev
				: graphqlEnpointProd,
	});

	const authMiddleware = new ApolloLink((operation, forward) => {
		operation.setContext({
			headers: {
				...headers,
				authorization: getToken(),
			},
		});

		return forward(operation);
	});

	return new ApolloClient({
		link: concat(authMiddleware, httpLink),
		cache: new InMemoryCache().restore(initialState || {}),
	});
});
