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

    extend type Mutation {
        likeRecipe(input: LikeRecipeInput!): RecipeReaction
    }
`;
