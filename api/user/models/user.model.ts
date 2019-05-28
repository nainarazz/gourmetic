import * as mongoose from 'mongoose';
import { User } from '../../../src/graphql-generated-types/query-types';

export const getUsersById = async (keys: string[]) => {
	return (await mongoose
		.model('user')
		.find({ _id: { $in: keys } })
		.lean()
		.exec()) as User[];
};
