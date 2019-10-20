import { Context } from './../../../graphql-generated-types/context';
import { Recipe } from '../../../graphql-generated-types/resolvers-types';

export const createdBy = async (
	userId: string,
	recipe: Recipe,
	context: Context
) => {
	return context.loaders.user.load({ userId, recipe });
};
