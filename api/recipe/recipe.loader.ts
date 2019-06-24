import { createLoader } from '../shared/create-loader';
import {
	getRecipeReactions,
	RecipeReactionKey,
} from './models/RecipeReaction.model';

export const createRecipeReactionLoader = () =>
	createLoader((keys: RecipeReactionKey[]) => {
		return getRecipeReactions(keys);
	});
