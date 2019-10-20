import * as mongoose from 'mongoose';
import { User } from '../../graphql-generated-types/resolvers-types';
import {
	MutationCreateUserArgs,
	Recipe,
} from './../../graphql-generated-types/resolvers-types';

export interface RecipeUserKey {
	userId: string;
	recipe: Recipe;
}

export const getUsersById = async (keys: RecipeUserKey[]) => {
	const recipes: Recipe[] = [];
	const userIds: string[] = [];

	keys.forEach(key => {
		userIds.push(key.userId);
		recipes.push(key.recipe);
	});

	const users = (await mongoose
		.model('user')
		.find({ _id: { $in: userIds } })
		.lean()
		.exec()) as User[];

	return recipes.map(recipe =>
		users.find(user => user._id.toString() === recipe.createdBy!.toString())
	);
};

export const getUserByOAuthAccountIdentifier = async (id: string) => {
	return (await mongoose
		.model('user')
		.findOne({ OAuthUniqueAccountId: id })
		.lean()
		.exec()) as User;
};

export const getUsersByOAuthAccountIdentifier = async (ids: string[]) => {
	return (await mongoose
		.model('user')
		.find({ OAuthUniqueAccountId: { $in: ids } })
		.lean()
		.exec()) as User[];
};

export const createUser = async ({ userInput }: MutationCreateUserArgs) => {
	const user = await mongoose
		.model('user')
		.findOne({
			OAuthUniqueAccountId: userInput && userInput.OAuthUniqueAccountId,
		})
		.lean()
		.exec();

	if (user) {
		return;
	}
	return mongoose.model('user').create(userInput);
};
