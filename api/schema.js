import customScalars from './custom-scalars/scalars';
import { makeExecutableSchema } from 'graphql-tools';
import { RecipeRootQuery } from './recipe/resolvers/queries/index';
import { RecipeTypes } from './recipe/types/Recipe';
import { UserType } from './user/types/User';

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

const typeDefs = [Root, customScalars.typeDefs, RecipeTypes, UserType];

const resolvers = {
	...customScalars.resolvers,
	// queries
	...RecipeRootQuery,
	// Mutations below
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
