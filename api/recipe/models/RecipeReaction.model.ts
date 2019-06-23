import * as mongoose from 'mongoose';
import { RecipeReaction } from '../../graphql-generated-types/resolvers-types';

export const getRecipeReaction = async (
	userId: string,
	recipeId: string
): Promise<RecipeReaction> => {
	return mongoose
		.model('recipeReaction')
		.findOne({ recipe: recipeId, user: userId })
		.populate('recipe')
		.lean()
		.exec();
};
