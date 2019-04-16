import { ApolloServer, gql } from 'apollo-server-express';
import * as express from 'express';
import typeDefs from './types';
import resolvers from './resolvers/queries/recipe';

const app = express();

const port = process.env.PORT || 4000;

const server = new ApolloServer({
	//@ts-ignore
	typeDefs,
	resolvers,
});

server.applyMiddleware({ app });

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
