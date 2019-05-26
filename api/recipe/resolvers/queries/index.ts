import { Context } from '../../../graphql-generated-types/context';
import { getRecipeList } from './recipe';
import { UserInputError } from 'apollo-server-core';
import {
	QueryResolvers,
	Recipe,
	RecipeResolvers,
} from './../../../graphql-generated-types/resolvers-types';

const QueryResolver: QueryResolvers<Context, Recipe> = {
	recipeList: async (parent, { first, after }, ctx) => {
		if (first! < 0) {
			throw new UserInputError('First must be a positive number');
		}
		return getRecipeList(ctx, { first: first!, after: after! });
	},
};

const RecipeResolver: RecipeResolvers<Context> = {
	image: () => {
		return 'image url here';
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
