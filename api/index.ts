import * as compression from 'compression';
import * as depthLimit from 'graphql-depth-limit';
import * as express from 'express';
import * as helmet from 'helmet';
import initSentry from './sentry';
import { ApolloServer } from 'apollo-server-express';
import { buildDataLoaders } from './shared/create-loader';
import { connectToDb } from './db';
import { schema } from './schema';
// tslint:disable-next-line:no-var-requires
const debug = require('debug')('api');

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
		context: async req => ({ db, loaders: buildDataLoaders() }),
		validationRules: [depthLimit(10)],
	});

	server.applyMiddleware({ app, path: '/api' });

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
