import { Context } from './../../../graphql-generated-types/context';

export const recipeReaction = async (
	userId: string,
	recipeId: string,
	context: Context
) => {
	return context.loaders.recipeReaction.load({ recipeId, userId });
};
