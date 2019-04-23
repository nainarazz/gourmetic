import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import { rootDirectory } from '../../api/root';

let initSentry = () => {
	// tslint:disable-next-line:no-console
	console.log('sentry not working in development mode');
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
}

export default initSentry;
