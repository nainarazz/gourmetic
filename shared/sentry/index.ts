import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import { rootDirectory } from '../../api/root';

export default () => {
	Sentry.init({
		dsn: 'https://85107c28501a4928af9d6f858492d8d1@sentry.io/1443816',
		integrations: [
			new RewriteFrames({
				root: rootDirectory,
			}),
		],
	});
};
