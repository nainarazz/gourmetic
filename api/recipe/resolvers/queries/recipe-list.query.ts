import { getPaginatedRecipes } from 'api/recipe/models/Recipe.model';
import { getUserByOAuthAccountIdentifier } from 'api/user/models/user.model';
import { QueryRecipeListArgs } from './../../../graphql-generated-types/resolvers-types';

export const getRecipeList = async (
	{ first, after }: QueryRecipeListArgs,
	userOAuthIdentifier: string
) => {
	const user = await getUserByOAuthAccountIdentifier(userOAuthIdentifier);

	const criteria = {
		$or: [
			{ isApproved: true, isPublic: true },
			{ createdBy: user && user._id },
		],
	}; // only get recipes that have been verified by admin or user's own recipes
	return getPaginatedRecipes({ first: first!, after: after! }, criteria);
};
