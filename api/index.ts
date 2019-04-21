import * as express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { schema } from './schema';

const app = express();

const port = process.env.PORT || 4000;

const server: ApolloServer = new ApolloServer({
	schema,
});

server.applyMiddleware({ app });

app.listen(port, () => {
	// tslint:disable-next-line:no-console
	console.log(`Listening on port ${port}`);
});
