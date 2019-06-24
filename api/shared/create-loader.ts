import * as DataLoader from 'dataloader';
import { createRecipeReactionLoader } from '../recipe/recipe.loader';
import { createUserLoader } from '../user/user.loader';

// tslint:disable-next-line:ban-types
export const createLoader = (batchFn: Function) => {
	return new DataLoader(keys => batchFn(keys), {
		cacheKeyFn: key => JSON.stringify(key),
	});
};

export const buildDataLoaders = () => ({
	user: createUserLoader(),
	recipeReaction: createRecipeReactionLoader(),
});
