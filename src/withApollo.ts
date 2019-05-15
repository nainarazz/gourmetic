import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { graphqlEnpointDev, graphqlEnpointProd } from './config';
import { withApollo } from 'next-with-apollo';

export default withApollo(
	({ ctx, headers, initialState }) =>
		new ApolloClient({
			uri:
				process.env.NODE_ENV === 'development'
					? graphqlEnpointDev
					: graphqlEnpointProd,
			cache: new InMemoryCache().restore(initialState || {}),
		})
);
