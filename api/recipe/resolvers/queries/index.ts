import { Context } from '../../../graphql-generated-types/context';
import { createdBy } from './createdBy.query';
import { recipeReaction } from './recipeReaction.query';
import { User } from '../../../graphql-generated-types/resolvers-types';
import {
	getPaginatedRecipes,
	getRecipeDetail,
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
};

const RecipeResolver: RecipeResolvers<Context> = {
	image: () => {
		return 'image url here';
	},
	createdBy: async (parent, args, ctx) => {
		const user = (await createdBy(parent.createdBy!._id, ctx)) as User;
		return user;
	},
	reaction: async (parent, args, ctx) => {
		return recipeReaction(parent.createdBy!._id, parent._id, ctx);
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
