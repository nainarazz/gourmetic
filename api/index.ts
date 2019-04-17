import * as express from 'express';
import resolvers from './resolvers/queries/recipe';
import typeDefs from './types';
import { ApolloServer, gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const app = express();

const port = process.env.PORT || 4000;

const server: ApolloServer = new ApolloServer({
	typeDefs: (typeDefs as unknown) as DocumentNode,
	resolvers,
});

server.applyMiddleware({ app });

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
