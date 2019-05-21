import { Context } from '../../../graphql-generated-types/context';
import {
	QueryResolvers,
	Recipe,
	RecipeResolvers,
} from './../../../graphql-generated-types/resolvers-types';

const QueryResolver: QueryResolvers<Context, Recipe> = {
	recipeList: async (parent, args, ctx) => {
		const recipes: Recipe[] = await ctx.db
			.model('recipe')
			.find({})
			.lean()
			.exec();

		const edges = recipes.map(r => ({
			cursor: r._id,
			node: r,
		}));

		return {
			PageInfo: null,
			edges,
		};
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
