import { Context } from './../../../graphql-generated-types/context';
import { createUser } from '../../models/user.model';
import {
	MutationResolvers,
	User,
} from '../../../graphql-generated-types/resolvers-types';

const MutationResolver: MutationResolvers<Context, User> = {
	createUser: (parent, args, ctx) => (createUser(args) as unknown) as User,
};

export const UserRootMutation = {
	Mutation: {
		...MutationResolver,
	},
};
