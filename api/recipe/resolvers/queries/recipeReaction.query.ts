import { Context } from './../../../graphql-generated-types/context';

export const recipeReaction = async (recipeId: string, context: Context) => {
	const oAuthAccountId = context.jwtTokenClaims && context.jwtTokenClaims.sub;

	return context.loaders.recipeReaction.load({
		recipeId,
		oAuthAccountId,
	});
};
