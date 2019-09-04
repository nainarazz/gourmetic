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

export const createUser = async ({ userInput }: MutationCreateUserArgs) =>
	mongoose.model('user').create(userInput);
