import * as mongoose from 'mongoose';
import { decode, encode } from '../../utils/base64';
import { PaginationOptions } from '../../utils/pagination';
import { Recipe } from '../../graphql-generated-types/resolvers-types';

export const getPaginatedRecipes = async (options: PaginationOptions) => {
	const { first, after } = options;
	const criteria = after
		? {
				_id: {
					$lt: decode(options.after),
				},
		  }
		: {};

	let recipes: Recipe[] = await mongoose
		.model('recipe')
		.find(criteria)
		.sort({ _id: -1 })
		.limit(options.first + 1)
		.lean()
		.exec();

	const hasNextPage = recipes.length > first;

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
};

export const getRecipeDetail = async (id: string) => {
	return mongoose
		.model('recipe')
		.findById(id)
		.lean()
		.exec();
};
