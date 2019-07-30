import { Ingredient, Instruction } from '../types/recipe.interface';

export const emptyIngredient: Ingredient = {
	item: '',
	measurement: '',
	quantity: '',
};

export const emptyInstruction: Instruction = {
	imageUrl: '',
	stepNumber: 0,
	description: '',
};
