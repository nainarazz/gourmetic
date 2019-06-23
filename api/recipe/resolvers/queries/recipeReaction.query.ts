import { getRecipeReaction } from '../../models/RecipeReaction.model';

export const recipeReaction = async (userId: string, recipeId: string) => {
	return getRecipeReaction(userId, recipeId);
};
