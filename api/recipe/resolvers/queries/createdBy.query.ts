import { Context } from './../../../graphql-generated-types/context';

export const createdBy = async (userId: string, context: Context) => {
	return context.loaders.user.load(userId);
};
