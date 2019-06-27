import { Context } from '../../../graphql-generated-types/context';
import { likeRecipe } from '../../models/RecipeReaction.model';
import {
	MutationResolvers,
	Recipe,
	RecipeReaction,
} from './../../../graphql-generated-types/resolvers-types';

const MutationResolver: MutationResolvers<Context, Recipe> = {
	likeRecipe: (parent, args, ctx): RecipeReaction =>
		likeRecipe(args, ctx) as RecipeReaction,
};

export const RecipeRootMutation = {
	Mutation: {
		...MutationResolver,
	},
};
