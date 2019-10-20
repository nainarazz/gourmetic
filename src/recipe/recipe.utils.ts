import {
	FormValues,
	Instruction,
	Recipe,
	ReactSelectOptions,
	Ingredient,
} from './types/recipe.interface';

const formatRecipeInstructions = (
	instructions: Instruction[]
): Instruction[] => {
	return instructions.map(
		(instruction, index): Instruction => ({
			imageUrl: instruction.imageUrl,
			description: instruction.description,
			stepNumber: index + 1,
		})
	);
};

const formatIngredients = (ingredients: Ingredient[]) =>
	ingredients.map(
		(i): Ingredient => ({
			measurement: i.measurement,
			quantity: i.quantity,
			item: i.item,
		})
	);

const formSelectOptions = (options: ReactSelectOptions[]): string[] =>
	options.map(o => o.value);

// tslint:disable-next-line:no-any
export const getFormattedRecipeData = (data: FormValues): any => {
	return {
		name: data.name,
		description: data.recipeDescription,
		prepTime: data.prepTime || 0,
		cookingTime: data.cookingTime || 0,
		difficulty: (data.difficulty as ReactSelectOptions).value,
		ingredients: formatIngredients(data.ingredients),
		instructions: formatRecipeInstructions(data.instructions),
		yield: data.yield,
		meal: formSelectOptions(data.meals as ReactSelectOptions[]),
		image: {
			secureUrl: '',
			publicId: '',
		},
		isPublic: data.isPublic,
	};
};
