const Sentry = require('@sentry/node');
const RewriteFrames = require('@sentry/integrations');
const rootDirectory = require('../../api/root');
const debug = require('debug')('sentry');

let initSentry = () => {
	/** */
};

if (process.env.NODE_ENV === 'production') {
	initSentry = () => {
		Sentry.init({
			dsn: process.env.SENTRY_DSN,
			integrations: [
				new RewriteFrames({
					root: rootDirectory,
				}),
			],
		});
	};
} else {
	debug('not working in development mode');
}

module.exports = initSentry;
