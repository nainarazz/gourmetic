import * as mongoose from 'mongoose';
import { Context } from './../../graphql-generated-types/context';
import { MutationLikeRecipeArgs } from './../../graphql-generated-types/resolvers-types';
import { RecipeReaction } from '../../graphql-generated-types/resolvers-types';

export interface RecipeReactionKey {
	recipeId: string;
	userId: string;
}

export const getRecipeReactions = async (
	keys: RecipeReactionKey[]
): Promise<RecipeReaction[]> => {
	const recipeIds = [];
	const userIds = [];
	for (const obj of keys) {
		recipeIds.push(obj.recipeId);
		userIds.push(obj.userId);
	}

	const reactions: RecipeReaction[] = await mongoose
		.model('recipeReaction')
		.find({
			recipe: {
				$in: recipeIds,
			},
			user: {
				$in: userIds,
			},
		})
		.lean()
		.exec();

	return keys.map(
		k =>
			reactions.find(
				r =>
					r.recipe!._id.toString() === k.recipeId.toString() &&
					r.user!._id.toString() === k.userId.toString()
			) || {}
	);
};

export const likeRecipe = async (
	args: MutationLikeRecipeArgs,
	ctx: Context
) => {
	return mongoose.model('recipeReaction').create({
		recipe: args.recipeId,
		user: '5cec0708fb6fc01bf23cec50',
		isLiked: true,
	});
};
