import * as mongoose from 'mongoose';
import { decode } from '../../utils/base64';
import { deleteRecipeReaction } from './RecipeReaction.model';
import { getUserByOAuthAccountIdentifier } from '../../user/models/user.model';
import { paginateArray, PaginationOptions } from '../../utils/pagination';
import {
	RecipeInput,
	DeleteRecipeInput,
	SearchRecipeInput,
} from './../../graphql-generated-types/resolvers-types';
import {
	Recipe,
	MutationCreateRecipeArgs,
} from '../../graphql-generated-types/resolvers-types';

export const getPaginatedRecipes = async (
	options: PaginationOptions,
	criteria = {}
) => {
	const { first, after } = options;
	const recipeCriteria = after
		? {
				_id: {
					$lt: decode(after),
				},
				...criteria,
		  }
		: criteria;

	const recipes: Recipe[] = await mongoose
		.model('recipe')
		.find(recipeCriteria)
		.sort({ _id: -1 })
		.limit(first + 1)
		.lean()
		.exec();

	return paginateArray(options, recipes);
};

export const getMyrecipes = async (
	paginationOptions: PaginationOptions,
	userOAuthIdentifier: string
) => {
	if (!userOAuthIdentifier!) {
		throw new Error('User not logged in.');
	}
	const user = await getUserByOAuthAccountIdentifier(userOAuthIdentifier);
	return getPaginatedRecipes(paginationOptions, { createdBy: user._id });
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
		meal: args.recipeInput.meal,
		yield: args.recipeInput.yield,
		difficulty: args.recipeInput.difficulty,
		image: args.recipeInput.image,
		createdAt: new Date(),
		updatedAt: new Date(),
		createdBy: user._id,
	};
	return mongoose.model('recipe').create(recipe);
};

export const updateRecipe = async (id: string, data: RecipeInput) => {
	const recipe = {
		_id: id,
		...data,
		updatedAt: new Date(),
	};

	return mongoose
		.model('recipe')
		.findByIdAndUpdate(id, recipe)
		.exec();
};

export const deleteRecipe = async (input: DeleteRecipeInput) => {
	if (input.reactionId) {
		await deleteRecipeReaction(input.reactionId);
	}
	return mongoose.model('recipe').findByIdAndDelete(input.recipeId);
};

export const searchRecipe = async (
	input: SearchRecipeInput,
	{ first, after }: PaginationOptions
) => {
	const searchCondition = {
		$or: [
			{ name: { $regex: input.name, $options: 'i' } },
			{ 'ingredients.item': { $regex: input.name, $options: 'i' } },
		],
	};

	const filterCondition = { meal: { $in: input.meal } };

	const conditions = {
		...(input.name && searchCondition),
		...(input.meal && input.meal.length > 0 && filterCondition),
	};

	const criteria = after
		? {
				_id: {
					$lt: decode(after),
				},
				...conditions,
		  }
		: conditions;
	const recipes: Recipe[] = await mongoose
		.model('recipe')
		.find(criteria)
		.sort({ _id: -1 })
		.limit(first + 1)
		.lean()
		.exec();

	return paginateArray({ first, after }, recipes);
};
