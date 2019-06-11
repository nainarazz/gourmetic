const withTypescript = require('@zeit/next-typescript');
const nextOffline = require('next-offline');

module.exports = withTypescript(
	nextOffline({
		target: 'serverless',
	})
);
