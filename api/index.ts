import { ApolloServer, gql } from 'apollo-server-express';
import * as express from 'express';

const app = express();

const port = process.env.PORT || 4000;

const typeDefs = gql`
	type Book {
		title: String
		author: Author
		year: Int
	}

	type Author {
		books: [Book]
	}

	type Query {
		author: Author
	}
`;

const resolvers = {
	Query: {
		author: () => {
			return {
				books: [
					{
						title: 'new book',
					},
				],
			};
		},
	},
	Author: {
		books: () => {
			return [
				{
					title: 'another book',
					year: 2018,
				},
			];
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.applyMiddleware({ app });

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
