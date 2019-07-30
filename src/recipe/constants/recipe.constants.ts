import { Ingredient, Instruction } from '../types/recipe.interface';
import { Meal, ReactSelectOptions } from './../types/recipe.interface';

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
