import {
	FormValues,
	Instruction,
	Recipe,
	ReactSelectOptions,
} from './types/recipe.interface';

const formatRecipeInstructions = (
	instructions: Instruction[]
): Instruction[] => {
	return instructions.map(
		(instruction, index): Instruction => ({
			...instruction,
			stepNumber: index + 1,
		})
	);
};

const formSelectOptions = (options: ReactSelectOptions[]): string[] =>
	options.map(o => o.value);

export const getFormattedRecipeData = (data: FormValues): Partial<Recipe> => {
	return {
		name: data.name,
		description: data.recipeDescription,
		prepTime: data.prepTime,
		cookingTime: data.cookingTime,
		difficulty: data.difficulty,
		ingredients: data.ingredients,
		instructions: formatRecipeInstructions(data.instructions),
		yield: data.yield,
		meals: formSelectOptions(data.meals as ReactSelectOptions[]),
		image: '',
		isPublic: data.isPublic,
	};
};
