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
		prepTime: data.prepTime || 0,
		cookingTime: data.cookingTime || 0,
		difficulty: (data.difficulty as ReactSelectOptions).value,
		ingredients: data.ingredients,
		instructions: formatRecipeInstructions(data.instructions),
		yield: data.yield,
		meals: formSelectOptions(data.meals as ReactSelectOptions[]),
		image: {
			secureUrl: '',
			publicId: '',
		},
		isPublic: data.isPublic,
	};
};
