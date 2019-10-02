export const RecipeReactionTypes = `
    type RecipeReaction {
        _id: ID,
        recipe: Recipe,
        user: User,
        isLiked: Boolean
    }

    input LikeRecipeInput {
        reactionId: ID
		recipeId: String
		userId: String
		isLiked: Boolean
    }

    type RecipeReactionEdge {
        cursor: String!
        node: RecipeReaction!
    }

    type RecipeReactionResult {
        pageInfo: PageInfo
        edges: [RecipeReactionEdge]!
    }

    extend type Query {
        likedRecipes(first: Int, after: String): RecipeReactionResult
    }

    extend type Mutation {
        likeRecipe(input: LikeRecipeInput!): RecipeReaction
    }
`;
