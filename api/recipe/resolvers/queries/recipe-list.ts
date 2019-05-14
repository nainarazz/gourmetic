import { QueryResolvers } from '../../../graphql-generated-types/resolvers-types';

export const recipeList: QueryResolvers = {
	recipeList: async (parent, args, ctx) =>
		ctx.db
			.model('recipe')
			.find({})
			.lean()
			.exec(),
};
