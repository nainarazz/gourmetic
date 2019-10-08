import { AuthenticationError } from 'apollo-server-core';
import { Context } from '../../../graphql-generated-types/context';
import { createRecipe, updateRecipe } from '../../models/Recipe.model';
import { likeRecipe } from '../../models/RecipeReaction.model';
import {
	MutationResolvers,
	RecipeReaction,
	Recipe,
} from './../../../graphql-generated-types/resolvers-types';

const MutationResolver: MutationResolvers<Context, Recipe> = {
	likeRecipe: async (parent, args, ctx) => {
		const user: JwtTokenClaims | null = ctx.jwtTokenClaims;
		if (!user) {
			throw new AuthenticationError('User is not authenticated.');
		}
		return likeRecipe(args, user.sub) as RecipeReaction;
	},
	createRecipe: async (parent, args, ctx) => {
		const user: JwtTokenClaims | null = ctx.jwtTokenClaims;
		if (!user) {
			throw new AuthenticationError('User is not authenticated.');
		}
		return (createRecipe(args, user.sub) as unknown) as Recipe;
	},
	updateRecipe: async (parent, args, ctx) => {
		const user: JwtTokenClaims | null = ctx.jwtTokenClaims;
		if (!user) {
			throw new AuthenticationError('User is not authenticated.');
		}
		return (updateRecipe(args.id, args.updatedRecipe) as unknown) as Recipe;
	},
};

export const RecipeRootMutation = {
	Mutation: {
		...MutationResolver,
	},
};
