const express = require('express');
const next = require('next');
const router = require('./router');
const routeList = require('../routes');
const debug = require('debug')('next');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, dir: './src' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	const routes = router(app, routeList);
	server.use('/', routes);
	server.get('*', (req, res) => handle(req, res));

	const port = process.env.PORT_NEXT || 3000;
	server.listen(port, err => {
		if (err) {
			throw err;
		}

		debug(`next server running on port ${port}`);
	});
});
