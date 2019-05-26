import { Context } from '../../../graphql-generated-types/context';
import { decode, encode } from './../../../../shared/utils/base64';
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

		let recipes: Recipe[];

		if (after) {
			const cursor = decode(after as string);
			recipes = await ctx.db
				.model('recipe')
				.find({
					_id: {
						$lt: cursor,
					},
				})
				.sort({ _id: -1 })
				.limit(first! + 1)
				.lean()
				.exec();
		} else {
			recipes = await ctx.db
				.model('recipe')
				.find()
				.sort({ _id: -1 })
				.limit(first! + 1)
				.lean()
				.exec();
		}

		const hasNextPage = recipes.length > first! - 1;

		//remove extra
		if (hasNextPage) {
			recipes = recipes.slice(0, recipes.length - 1);
		}

		const edges = recipes.map(r => ({
			cursor: encode(r._id.toString()),
			node: r,
		}));

		return {
			pageInfo: {
				hasNextPage,
			},
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
