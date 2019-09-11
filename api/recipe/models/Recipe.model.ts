import * as mongoose from 'mongoose';
import { decode, encode } from '../../utils/base64';
import { getUserByOAuthAccountIdentifier } from '../../user/models/user.model';
import { PaginationOptions } from '../../utils/pagination';
import {
	Recipe,
	MutationCreateRecipeArgs,
} from '../../graphql-generated-types/resolvers-types';

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

export const createRecipe = async (
	args: MutationCreateRecipeArgs,
	userOAuthIdentifier: string
) => {
	const user = await getUserByOAuthAccountIdentifier(userOAuthIdentifier);
	if (!user) {
		throw new Error('User not found.');
	}

	const recipe = {
		name: args.recipeInput.name,
		description: args.recipeInput.description,
		cookingTime: args.recipeInput.cookingTime,
		prepTime: args.recipeInput.prepTime,
		ingredients: args.recipeInput.ingredients,
		instructions: args.recipeInput.instructions,
		isPublic: args.recipeInput.isPublic,
		meals: args.recipeInput.meals,
		yield: args.recipeInput.yield,
		difficulty: args.recipeInput.difficulty,
		image: args.recipeInput.image,
		createdAt: new Date(),
		updatedAt: new Date(),
		createdBy: user._id,
	};
	return mongoose.model('recipe').create(recipe);
};
