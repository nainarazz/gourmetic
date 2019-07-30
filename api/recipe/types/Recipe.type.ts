import { meals } from '../constants/recipe.constants';

export const RecipeTypes = `
    enum Meals {
        ${meals}
    }

    type Instructions {
        imageUrl: String
        stepNumber: Int!
        description: String!
    }

    type Ingredient {
        measurement: String
        item: String!
        quantity: String
    }

    type Recipe {
        _id: ID!
        name: String!
        description: String!
        meal: [Meals]
        prepTime: Int
        cookingTime: Int
        ingredients: [Ingredient!]!
        instructions: [Instructions]!
        yield: Int
        image: String
        isPublic: Boolean
        reaction: RecipeReaction
        createdBy: User
        createdAt: Date
        updatedAt: Date
    }

    type PageInfo {
        hasNextPage: Boolean!
    }

    type RecipeEdge {
        cursor: String!
        node: Recipe!
    }

    type RecipeResult {
        pageInfo: PageInfo
        edges: [RecipeEdge]!
    }

    extend type Query {
        recipeList(first: Int, after: String): RecipeResult
        recipeDetail(id: ID): Recipe
    }
`;
