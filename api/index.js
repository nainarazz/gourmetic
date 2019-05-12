import * as compression from 'compression';
import * as depthLimit from 'graphql-depth-limit';
import * as express from 'express';
import * as helmet from 'helmet';
import initSentry from '../shared/sentry';
import { ApolloServer } from 'apollo-server-express';
import { connectToDb } from './db';
import { schema } from './schema';
const debug = require('debug')('api');

require('now-env');

const startServer = async () => {
	const app = express();

	const db = await connectToDb();

	const port = process.env.PORT || 4000;
	app.use(compression());
	app.use(helmet());

	const server = new ApolloServer({
		schema,
		context: async req => ({ db }),
		validationRules: [depthLimit(10)],
	});

	server.applyMiddleware({ app });

	app.listen(port, () => {
		// tslint:disable-next-line:no-console
		debug(`Listening on port ${port}`);
	});
};

try {
	initSentry();
} catch (error) {
	debug('Error initializing sentry');
	process.exit(1);
}

startServer();
