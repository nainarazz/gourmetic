export enum Meal {
	Breakfast = 'BREAKFAST',
	Lunch = 'LUNCH',
	Supper = 'SUPPER',
	Snack = 'SNACK',
	Dessert = 'DESSERT',
	Entree = 'ENTREE',
}

export interface ReactSelectOptions {
	value: string;
	label: string;
}

export interface Instruction {
	imageUrl: string;
	stepNumber: number;
	description: string;
}

export interface Ingredient {
	measurement: string;
	item: string;
	quantity: string;
}

export interface Recipe {
	name: string;
	description: string;
	meal: Meal;
	prepTime: number;
	cookingTime: number;
	ingredients: Ingredient;
	instructions: Instruction;
	yield: number;
	image: string;
	isPublic: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface FormValues {
	name: string;
	description: string;
	ingredients: Ingredient[];
	instructions: Instruction[];
	prepTime: number;
	cookingTime: number;
	difficulty: string;
	yield: number;
	image: string;
	mealType: string[];
	isPublic: boolean;
}
