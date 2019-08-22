import { Meal, ReactSelectOptions } from './../types/recipe.interface';
import {
	Ingredient,
	Instruction,
	RecipeDifficulty,
} from '../types/recipe.interface';

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

export const mealTypeOptions: ReactSelectOptions[] = [
	{
		value: Meal.Breakfast,
		label: 'Breakfast',
	},
	{
		value: Meal.Lunch,
		label: 'Lunch',
	},
	{
		value: Meal.Supper,
		label: 'Supper',
	},
	{
		value: Meal.Snack,
		label: 'Snack',
	},
	{
		value: Meal.Dessert,
		label: 'Dessert',
	},
	{
		value: Meal.Entree,
		label: 'Entree',
	},
];

export const recipeDifficulties: ReactSelectOptions[] = [
	{ value: RecipeDifficulty.Easy, label: 'Easy' },
	{ value: RecipeDifficulty.Medium, label: 'Medium' },
	{ value: RecipeDifficulty.Hard, label: 'Hard' },
];
