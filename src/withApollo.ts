import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { getToken } from './authentication/react-auth0-wrapper';
import { graphqlEnpointDev, graphqlEnpointProd } from './config';
import { withApollo } from 'next-with-apollo';

export default withApollo(({ ctx, headers, initialState }) => {
	return new ApolloClient({
		uri:
			process.env.NODE_ENV === 'development'
				? graphqlEnpointDev
				: graphqlEnpointProd,
		cache: new InMemoryCache().restore(initialState || {}),
		request: operation => {
			// tslint:disable-next-line:no-any
			operation.setContext((context: any) => ({
				headers: {
					...headers,
					authorization: getToken(),
				},
			}));
		},
	});
});
