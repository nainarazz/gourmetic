export const RecipeReactionTypes = `
    type RecipeReaction {
        _id: ID,
        recipe: Recipe,
        user: User,
        isLiked: Boolean
    }
`;
