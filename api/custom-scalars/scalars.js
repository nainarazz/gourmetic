const GraphQLDate = require('graphql-date');

const typeDefs = /* GraphQL */ `
	scalar Date
`;

const resolvers = {
	Date: GraphQLDate,
};

export default {
	typeDefs,
	resolvers,
};
