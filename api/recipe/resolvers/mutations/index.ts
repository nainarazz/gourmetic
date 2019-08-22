import { Context } from '../../../graphql-generated-types/context';
import { createRecipe } from '../../models/Recipe.model';
import { likeRecipe } from '../../models/RecipeReaction.model';
import {
	MutationResolvers,
	RecipeReaction,
	Recipe,
} from './../../../graphql-generated-types/resolvers-types';

const MutationResolver: MutationResolvers<Context, Recipe> = {
	likeRecipe: (parent, args, ctx) => likeRecipe(args, ctx) as RecipeReaction,
	createRecipe: (parent, args, ctx) =>
		(createRecipe(args) as unknown) as Recipe,
};

export const RecipeRootMutation = {
	Mutation: {
		...MutationResolver,
	},
};
