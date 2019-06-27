import customScalars from './custom-scalars/scalars';
import { IResolvers, makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import { RecipeReactionTypes } from './recipe/types/RecipeReaction.type';
import { RecipeRootMutation } from './recipe/resolvers/mutations';
import { RecipeRootResolver } from './recipe/resolvers/queries/index';
import { RecipeTypes } from './recipe/types/Recipe.type';
import { UserType } from './user/types/User.type';

const Root = `
	# The dummy queries and mutations are necessary because
	# graphql-js cannot have empty root types and we only extend
	# these types later on
	# Ref: apollographql/graphql-tools#293
	type Query {
		dummy: String
	}
	type Mutation {
		dummy: String
	}
	type Subscription {
		dummy: String
	}
	schema {
		query: Query
		mutation: Mutation
		subscription: Subscription
	}
`;

const typeDefs: string[] = [
	Root,
	customScalars.typeDefs,
	RecipeTypes,
	RecipeReactionTypes,
	UserType,
];

const resolvers = merge(
	{},
	// queries
	RecipeRootResolver as IResolvers,
	// Mutations below
	RecipeRootMutation as IResolvers
);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
