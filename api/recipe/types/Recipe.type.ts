export const RecipeTypes = `
    enum Meals {
        BREAKFAST
        LUNCH
        SUPPER
        SNACK
        DESSERT
        ENTREE
    }

    enum DietLabels {
        LOW_SALT
        HIGH_PROTEIN
        VEGAN
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
        dietLabels: [DietLabels]
        isPublic: Boolean
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
    }
`;