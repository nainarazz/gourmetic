import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import { rootDirectory } from './root';
// tslint:disable-next-line:no-var-requires
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

export default initSentry;
