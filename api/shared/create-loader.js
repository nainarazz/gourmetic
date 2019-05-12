import DataLoader from 'dataloader';

const createLoader = (mongoDbModelName, batchFn) => {
	return new DataLoader(keys => batchFn(mongoDbModelName, keys), {
		cacheKeyFn: key => key.toString(),
	});
};
export default createLoader;
