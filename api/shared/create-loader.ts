import DataLoader from 'dataloader';

// tslint:disable-next-line:ban-types
const createLoader = (mongoDbModelName: string, batchFn: Function) => {
	return new DataLoader(keys => batchFn(mongoDbModelName, keys), {
		cacheKeyFn: key => key.toString(),
	});
};
export default createLoader;
