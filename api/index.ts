import * as compression from 'compression';
import * as depthLimit from 'graphql-depth-limit';
import * as express from 'express';
import * as helmet from 'helmet';
import { ApolloServer, gql } from 'apollo-server-express';
import { connectToDb } from './db';
import { schema } from './schema';

// tslint:disable-next-line:no-var-requires
require('now-env');

const startServer = async () => {
	const app = express();

	const db = await connectToDb();

	const port = process.env.PORT || 4000;
	app.use(compression());
	app.use(helmet());

	const server: ApolloServer = new ApolloServer({
		schema,
		context: async req => ({ db }),
		validationRules: [depthLimit(10)],
	});

	server.applyMiddleware({ app });

	app.listen(port, () => {
		// tslint:disable-next-line:no-console
		console.log(`Listening on port ${port}`);
	});
};

startServer();
