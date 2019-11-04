import { Meal, ReactSelectOptions } from './../types/recipe.interface';
import { RecipeFilterType } from 'src/recipe/types/recipe.interface';
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

export const DEFAULT_IMAGE_PLACEHOLDER_PUBLIC_ID =
	'recipes/image-placeholder.png';

export const defaultRecipeFilters: RecipeFilterType[] = [
	{ value: Meal.Breakfast, label: 'Breakfast', isSelected: false },
	{ value: Meal.Snack, label: 'Snack', isSelected: false },
	{ value: Meal.Entree, label: 'Entrée', isSelected: false },
	{ value: Meal.Lunch, label: 'Lunch', isSelected: false },
	{ value: Meal.Dessert, label: 'Dessert', isSelected: false },
	{ value: Meal.Supper, label: 'Supper', isSelected: false },
];
