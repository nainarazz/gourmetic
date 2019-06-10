import * as mongoose from 'mongoose';
import { User } from '../../graphql-generated-types/resolvers-types';

export const getUsersById = async (keys: string[]) => {
	return (await mongoose
		.model('user')
		.find({ _id: { $in: keys } })
		.lean()
		.exec()) as User[];
};
