import * as express from 'express';
import * as next from 'next';
import router from './router';
import { routes as routeList } from '../routes';
// tslint:disable-next-line:no-var-requires
const debug = require('debug')('next');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, dir: './src' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	const routes = router(app, routeList);
	server.use('/', routes);
	server.get('*', (req: express.Request, res: express.Response) =>
		handle(req, res)
	);

	const port = process.env.PORT_NEXT || 3000;
	server.listen(port, () => {
		debug(`next server running on port ${port}`);
	});
});
