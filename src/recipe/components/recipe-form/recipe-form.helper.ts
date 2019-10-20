import {
	Recipe,
	FormValues,
	ReactSelectOptions,
} from 'src/recipe/types/recipe.interface';

export const emptyRecipeFormValues: FormValues = {
	name: '',
	recipeDescription: '',
	instructions: [],
	ingredients: [],
	prepTime: 0,
	cookingTime: 0,
	difficulty: { value: '', label: '' },
	yield: 0,
	image: '',
	isPublic: false,
	meals: [],
};

export const getRecipeFormValues = (recipe: Recipe | undefined): FormValues => {
	if (!recipe) {
		return emptyRecipeFormValues;
	}

	return {
		name: recipe.name,
		recipeDescription: recipe.description,
		instructions: recipe.instructions,
		ingredients: recipe.ingredients,
		prepTime: recipe.prepTime,
		cookingTime: recipe.cookingTime,
		difficulty: { value: recipe.difficulty, label: recipe.difficulty },
		yield: recipe.yield,
		image: recipe.image.secureUrl,
		isPublic: recipe.isPublic,
		meals: recipe.meal.map(
			(m): ReactSelectOptions => ({
				value: m,
				label: m,
			})
		),
	};
};
