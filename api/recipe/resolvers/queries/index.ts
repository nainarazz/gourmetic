import { Context } from '../../../graphql-generated-types/context';
import {
	QueryResolvers,
	Recipe,
} from './../../../graphql-generated-types/resolvers-types';

export const RecipeRootQuery: QueryResolvers<Context, Recipe> = {
	recipeList: async (parent, args, ctx) =>
		ctx.db
			.model('recipe')
			.find({})
			.lean()
			.exec(),
};
