const withTypescript = require('@zeit/next-typescript');
const nextOffline = require('next-offline');

const nextConfig = {
	target: 'serverless',
	workboxOpts: {
		swDest: 'static/service-worker.js',
		runtimeCaching: [
			{
				urlPattern: /.png$|.jpg$|.jpeg$|.gif$/,
				handler: 'CacheFirst',
			},
			{
				urlPattern: /api/,
				handler: 'NetworkFirst',
				options: {
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
		],
	},
};

module.exports = nextOffline(withTypescript(nextConfig));
