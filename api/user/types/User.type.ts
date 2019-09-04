export const UserType = `
    type User {
        _id: ID!
        providerId: String!
        firstname: String!
        lastname: String!
        email: String!
        photo: String
    }

    input UserInput {
        providerId: String!
        firstname: String!
        lastname: String!
        email: String!
        photo: String
    }

    extend type Mutation {
        createUser(userInput: UserInput): User
    }
`;
