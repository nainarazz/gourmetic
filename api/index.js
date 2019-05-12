const compression = require('compression');
const depthLimit = require('graphql-depth-limit');
const express = require('express');
const helmet = require('helmet');
const initSentry = require('../shared/sentry');
const ApolloServer = require('apollo-server-express');
const connectToDb = require('./db');
const schema = require('./schema');
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
