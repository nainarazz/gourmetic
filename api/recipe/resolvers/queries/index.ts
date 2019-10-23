import { Context } from '../../../graphql-generated-types/context';
import { createdBy } from './createdBy.query';
import { getPaginatedRecipeReactions } from '../../models/RecipeReaction.model';
import { recipeReaction } from './recipeReaction.query';
import { User } from '../../../graphql-generated-types/resolvers-types';
import {
	getPaginatedRecipes,
	getRecipeDetail,
	getMyrecipes,
	searchRecipe,
} from '../../models/Recipe.model';
import {
	QueryResolvers,
	Recipe,
	RecipeResolvers,
} from './../../../graphql-generated-types/resolvers-types';

const QueryResolver: QueryResolvers<Context, Recipe> = {
	recipeList: async (parent, { first, after }) =>
		getPaginatedRecipes({ first: first!, after: after! }),
	recipeDetail: async (parent, args) => getRecipeDetail(args.id as string),
	myRecipes: async (parent, { first, after }, ctx) => {
		const userOAuthId =
			(ctx.jwtTokenClaims && ctx.jwtTokenClaims.sub) || '';
		return getMyrecipes({ first: first!, after: after! }, userOAuthId);
	},
	likedRecipes: async (parent, { first, after }, ctx) => {
		const userOAuthId =
			(ctx.jwtTokenClaims && ctx.jwtTokenClaims.sub) || '';
		return getPaginatedRecipeReactions(
			{ first: first!, after: after! },
			userOAuthId
		);
	},
	searchRecipes: async (parent, { searchInput, first, after }) =>
		searchRecipe(searchInput, { first: first!, after: after! }),
};

const RecipeResolver: RecipeResolvers<Context> = {
	createdBy: async (parent, args, ctx) => {
		const user = (await createdBy(
			parent.createdBy!._id,
			parent,
			ctx
		)) as User;
		return user;
	},
	reaction: async (parent, args, ctx) => {
		return recipeReaction(parent._id, ctx);
	},
};

export const RecipeRootResolver = {
	Query: {
		...QueryResolver,
	},
	Recipe: {
		...RecipeResolver,
	},
};
