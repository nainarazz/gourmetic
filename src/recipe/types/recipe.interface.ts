export enum Meal {
	Breakfast = 'BREAKFAST',
	Lunch = 'LUNCH',
	Supper = 'SUPPER',
	Snack = 'SNACK',
	Dessert = 'DESSERT',
	Entree = 'ENTREE',
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
