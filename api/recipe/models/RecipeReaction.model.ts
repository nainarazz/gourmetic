import * as mongoose from 'mongoose';
import { decode } from '../../utils/base64';
import { MutationLikeRecipeArgs } from './../../graphql-generated-types/resolvers-types';
import { paginateArray, PaginationOptions } from '../../utils/pagination';
import { RecipeReaction } from '../../graphql-generated-types/resolvers-types';
import {
	getUserByOAuthAccountIdentifier,
	getUsersByOAuthAccountIdentifier,
} from '../../user/models/user.model';

export interface RecipeReactionKey {
	recipeId: string;
	oAuthAccountId: string;
}

export const getRecipeReactions = async (
	keys: RecipeReactionKey[]
): Promise<RecipeReaction[]> => {
	const recipeIds = [];
	const oAuthUniqueIds = [];

	for (const obj of keys) {
		recipeIds.push(obj.recipeId);
		oAuthUniqueIds.push(obj.oAuthAccountId);
	}

	const userIds = (await getUsersByOAuthAccountIdentifier(
		oAuthUniqueIds
	)).map(user => user._id);

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
		.populate('user', 'OAuthUniqueAccountId')
		.lean()
		.exec();

	// graphql data loader library requires us to return same length of data as the same length of keys
	return keys.map(
		k =>
			reactions.find(
				r =>
					r.recipe!._id.toString() === k.recipeId.toString() &&
					r.user!.OAuthUniqueAccountId.toString() ===
						k.oAuthAccountId.toString()
			) || {}
	);
};

export const getPaginatedRecipeReactions = async (
	options: PaginationOptions,
	userOAuthIdentifier: string
) => {
	if (!userOAuthIdentifier!) {
		throw new Error('User not logged in.');
	}
	const user = await getUserByOAuthAccountIdentifier(userOAuthIdentifier);

	const { first, after } = options;
	const criteria = after
		? {
				_id: {
					$lt: decode(after),
				},
				user: user._id,
				isLiked: true,
		  }
		: { user: user._id, isLiked: true };

	const reactions: RecipeReaction[] = await mongoose
		.model('recipeReaction')
		.find(criteria)
		.select('recipe')
		.populate('recipe')
		.sort({ _id: -1 })
		.limit(first + 1)
		.lean()
		.exec();

	return paginateArray(options, reactions);
};

export const likeRecipe = async (
	args: MutationLikeRecipeArgs,
	userOAuthIdentifier: string
) => {
	const { reactionId, recipeId, isLiked } = args.input;

	if (reactionId) {
		return mongoose
			.model('recipeReaction')
			.findByIdAndUpdate(
				reactionId,
				{ $set: { isLiked: !isLiked } },
				{ new: true }
			);
	}

	const user = await getUserByOAuthAccountIdentifier(userOAuthIdentifier);

	if (!user) {
		throw new Error('User not found.');
	}
	return mongoose.model('recipeReaction').create({
		recipe: recipeId,
		user: user._id,
		isLiked: true,
	});
};

export const deleteRecipeReaction = async (id: string) =>
	mongoose.model('recipeReaction').findByIdAndDelete(id);
