import { difficulties, meals } from '../constants/recipe.constants';

export const RecipeTypes = `
    enum Meal {
        ${meals}
    }

    enum Difficulty {
        ${difficulties}
    }

    type Instruction {
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
        meals: [Meal]
        prepTime: Int
        cookingTime: Int
        difficulty: Difficulty
        ingredients: [Ingredient!]!
        instructions: [Instruction]!
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

    input IngredientInput {
        measurement: String
        item: String!
        quantity: String
    }

    input InstructionInput {
        imageUrl: String
        stepNumber: Int!
        description: String!
    }

    input RecipeInput {
        name: String!
        description: String!
        meals: [String]
        prepTime: Int
        cookingTime: Int
        difficulty: String
        ingredients: [IngredientInput!]!
        instructions: [InstructionInput!]!
        yield: Int
        image: String
        isPublic: Boolean
    }

    extend type Query {
        recipeList(first: Int, after: String): RecipeResult
        recipeDetail(id: ID): Recipe
    }

    extend type Mutation {
        createRecipe(recipeInput: RecipeInput!): Recipe
    }
`;
