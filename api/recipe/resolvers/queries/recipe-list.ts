// tslint:disable-next-line:no-any
export const recipeList = async (parent: any, args: any, ctx: any) => {
	const recipes = await ctx.db
		.model('recipe')
		.find({})
		.exec();
	return recipes;
};
