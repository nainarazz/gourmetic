const withTypescript = require('@zeit/next-typescript');
const nextOffline = require('next-offline');
const withCSS = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps')();

const nextConfig = {
	target: 'serverless',
	env: {
		CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
		CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
	},
	workboxOpts: {
		swDest: 'static/service-worker.js',
		runtimeCaching: [
			{
				urlPattern: /^https?.*/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'offlineCache',
					expiration: {
						maxEntries: 200,
					},
				},
			},
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
	webpack: (config, options) => {
		// config from next js examples
		// https://github.com/zeit/next.js/blob/canary/examples/with-sentry-simple/next.config.js
		if (!options.isServer) {
			config.resolve.alias['@sentry/node'] = '@sentry/browser';
		}

		return config;
	},
};

module.exports = nextOffline(
	withSourceMaps(withTypescript(withCSS(nextConfig)))
);
