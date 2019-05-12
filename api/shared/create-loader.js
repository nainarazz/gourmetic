const DataLoader = require('dataloader');

const createLoader = (mongoDbModelName, batchFn) => {
	return new DataLoader(keys => batchFn(mongoDbModelName, keys), {
		cacheKeyFn: key => key.toString(),
	});
};
module.exports = createLoader;
