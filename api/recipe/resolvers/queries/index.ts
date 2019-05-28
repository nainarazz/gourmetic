import { Context } from '../../../graphql-generated-types/context';
import { createdBy } from './createdBy.query';
import { getPaginatedRecipes } from '../../models/recipe.model';
import { User } from './../../../../src/graphql-generated-types/query-types';
import {
	QueryResolvers,
	Recipe,
	RecipeResolvers,
} from './../../../graphql-generated-types/resolvers-types';

const QueryResolver: QueryResolvers<Context, Recipe> = {
	recipeList: async (parent, { first, after }) =>
		getPaginatedRecipes({ first: first!, after: after! }),
};

const RecipeResolver: RecipeResolvers<Context> = {
	image: () => {
		return 'image url here';
	},
	createdBy: async (parent, args, ctx) => {
		const user = (await createdBy(parent.createdBy!._id, ctx)) as User;
		return user;
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
