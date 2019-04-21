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
        image: String
        stepNumber: Int!
        description: String!
    }

    type Recipe {
        _id: ID!
        name: String!
        description: String!
        meal: [Meals]
        prepTime: Int
        cookingTime: Int
        ingredients: [String!]!
        instructions: [Instructions]!
        yield: Int
        image: String
        dietLabels: [DietLabels]
        isPublic: Boolean
        createdAt: Date
        updatedAt: Date
    }

    extend type Query {
        recipeList: [Recipe]
    }
`;
