import { AuthenticationError } from 'apollo-server-core';
import { Context } from '../../../graphql-generated-types/context';
import { deleteImage, uploadImage } from './image-functions';
import { likeRecipe } from '../../models/RecipeReaction.model';
import {
	createRecipe,
	updateRecipe,
	deleteRecipe,
} from '../../models/Recipe.model';
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
	deleteRecipe: async (parent, args, ctx) => {
		const user: JwtTokenClaims | null = ctx.jwtTokenClaims;
		if (!user) {
			throw new AuthenticationError('User is not authenticated.');
		}
		return (deleteRecipe(args.input) as unknown) as Recipe;
	},
	uploadImage: async (parent, { file }, ctx) => {
		const user: JwtTokenClaims | null = ctx.jwtTokenClaims;
		if (!user) {
			throw new AuthenticationError('User is not authenticated.');
		}
		const f = await file;
		return uploadImage(f);
	},
	deleteImage: async (parent, { publicId }, ctx) => {
		const user: JwtTokenClaims | null = ctx.jwtTokenClaims;
		if (!user) {
			throw new AuthenticationError('User is not authenticated.');
		}
		return deleteImage(publicId);
	},
};

export const RecipeRootMutation = {
	Mutation: {
		...MutationResolver,
	},
};
