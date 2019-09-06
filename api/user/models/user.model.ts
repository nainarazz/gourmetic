import * as mongoose from 'mongoose';
import { MutationCreateUserArgs } from './../../graphql-generated-types/resolvers-types';
import { User } from '../../graphql-generated-types/resolvers-types';

export const getUsersById = async (keys: string[]) => {
	return (await mongoose
		.model('user')
		.find({ _id: { $in: keys } })
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
