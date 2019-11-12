import { Context } from '../../../graphql-generated-types/context';
import { createdBy } from './createdBy.query';
import { getPaginatedRecipeReactions } from '../../models/RecipeReaction.model';
import { getRecipeList } from './recipe-list.query';
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
	recipeList: async (parent, args, ctx) => {
		const userOAuthId =
			(ctx.jwtTokenClaims && ctx.jwtTokenClaims.sub) || '';
		return getRecipeList(args, userOAuthId);
	},
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
	searchRecipes: async (parent, { searchInput, first, after }, ctx) => {
		const userOAuthId =
			(ctx.jwtTokenClaims && ctx.jwtTokenClaims.sub) || '';
		return searchRecipe(
			searchInput,
			{ first: first!, after: after! },
			userOAuthId
		);
	},
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
