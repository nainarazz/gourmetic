import * as compression from 'compression';
import * as express from 'express';
import * as helmet from 'helmet';
import initSentry from './sentry';
import { ApolloServer } from 'apollo-server-express';
import { connectToDb } from './db';
import { createApolloServer } from './apollo';

// tslint:disable-next-line:no-var-requires
const debug = require('debug')('api');

if (!process.env.now) {
	// tslint:disable-next-line:no-var-requires
	require('dotenv').config();
}

const startServer = async () => {
	const app = express();

	const db = await connectToDb();

	const port = process.env.PORT || 4000;
	app.use(compression());
	app.use(helmet());

	const server: ApolloServer = createApolloServer(db);

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
