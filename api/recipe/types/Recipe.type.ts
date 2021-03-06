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

    type Image {
        secureUrl: String
        publicId: String
    }

    type Recipe {
        _id: ID!
        name: String!
        description: String!
        meal: [Meal]
        prepTime: Int
        cookingTime: Int
        difficulty: String
        ingredients: [Ingredient!]!
        instructions: [Instruction]!
        yield: Int
        image: Image
        isPublic: Boolean
        isApproved: Boolean
        reaction: RecipeReaction
        createdBy: User
        createdAt: Date
        updatedAt: Date
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

    input ImageInput {
        secureUrl: String
        publicId: String
    }

    input RecipeInput {
        name: String!
        description: String!
        meal: [String]
        prepTime: Int
        cookingTime: Int
        difficulty: String
        ingredients: [IngredientInput!]!
        instructions: [InstructionInput!]!
        yield: Int
        image: Upload
        isPublic: Boolean
    }

    input DeleteRecipeInput {
        recipeId: String!
        reactionId: String!
    }

    input SearchRecipeInput {
        name: String
        meal: [String]
    }

    extend type Query {
        recipeList(first: Int, after: String): RecipeResult
        recipeDetail(id: ID): Recipe
        myRecipes(first: Int, after: String): RecipeResult
        searchRecipes(searchInput: SearchRecipeInput!, first: Int, after: String): RecipeResult
    }

    extend type Mutation {
        createRecipe(recipeInput: RecipeInput!): Recipe
        updateRecipe(id: String!, updatedRecipe: RecipeInput!): Recipe
        deleteRecipe(input: DeleteRecipeInput!): Recipe
        uploadImage(file: Upload!): Image
        deleteImage(publicId: String!): String
    }
`;
