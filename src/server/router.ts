import * as express from 'express';
import * as next from 'next';
const router = express.Router();

const routeHandle = (
	request: express.Request,
	response: express.Response,
	app: next.Server,
	pageName: string
) => {
	const page = `/${pageName}`;
	const queryParams = request.params;
	app.render(request, response, page, queryParams);
};

// tslint:disable-next-line:ban-types
export default (app: next.Server, routes: Record<string, string>) => {
	Object.entries(routes).forEach(([path, page]) => {
		router.get(path, (req, res) => routeHandle(req, res, app, page));
	});
	return router;
};
