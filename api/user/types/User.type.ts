export const UserType = `
    type User {
        _id: ID!
        OAuthUniqueAccountId: String!
        firstname: String!
        lastname: String!
        email: String!
        photo: String
    }

    input UserInput {
        OAuthUniqueAccountId: String!
        firstname: String!
        lastname: String!
        email: String!
        photo: String
    }

    extend type Mutation {
        createUser(userInput: UserInput): User
    }
`;
