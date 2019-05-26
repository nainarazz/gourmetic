import { Context } from './../../../graphql-generated-types/context';
import { decode, encode } from '../../../utils/base64';
import { PaginationOptions } from '../../../utils/pagination';
import { Recipe } from '../../../../src/graphql-generated-types/query-types';

export const getRecipeList = async (
	context: Context,
	options: PaginationOptions
) => {
	const { first, after } = options;
	const criteria = after
		? {
				_id: {
					$lt: decode(options.after),
				},
		  }
		: {};

	let recipes: Recipe[] = await context.db
		.model('recipe')
		.find(criteria)
		.sort({ _id: -1 })
		.limit(first + 1)
		.lean()
		.exec();

	const hasNextPage = recipes.length > options.first! - 1;

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
