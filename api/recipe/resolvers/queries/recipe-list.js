export const recipeList = async (parent, args, ctx) => {
	const recipes = await ctx.db
		.model('recipe')
		.find({})
		.exec();
	return recipes;
};
