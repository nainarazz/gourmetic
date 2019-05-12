const customScalars = require('./custom-scalars/scalars');
const makeExecutableSchema = require('graphql-tools');
const RecipeRootQuery = require('./recipe/resolvers/queries/index');
const { Recipe } = require('./recipe/types/Recipe');
const { User } = require('./user/types/User');

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

const typeDefs = [Root, customScalars.typeDefs, Recipe, User];

const resolvers = {
	...customScalars.resolvers,
	// queries
	...RecipeRootQuery,
	// Mutations below
};

module.exports = makeExecutableSchema.makeExecutableSchema({
	typeDefs,
	resolvers,
});
