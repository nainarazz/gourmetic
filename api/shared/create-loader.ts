import * as DataLoader from 'dataloader';
import { createUserLoader } from '../user/user.loader';

// tslint:disable-next-line:ban-types
export const createLoader = (batchFn: Function) => {
	return new DataLoader(keys => batchFn(keys), {
		cacheKeyFn: key => key.toString(),
	});
};

export const buildDataLoaders = () => ({ user: createUserLoader() });
