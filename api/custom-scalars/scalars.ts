// tslint:disable-next-line: no-var-requires
const GraphQLDate = require('graphql-date');

const typeDefs = /* GraphQL */ `
	scalar Date
	scalar Upload
`;

const resolvers = {
	Date: GraphQLDate,
};

export default {
	typeDefs,
	resolvers,
};
