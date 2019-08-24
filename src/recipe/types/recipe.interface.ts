import { User } from '../../user/types/user.interface';

export enum Meal {
	Breakfast = 'BREAKFAST',
	Lunch = 'LUNCH',
	Supper = 'SUPPER',
	Snack = 'SNACK',
	Dessert = 'DESSERT',
	Entree = 'ENTREE',
}

export enum RecipeDifficulty {
	Easy = 'EASY',
	Medium = 'MEDIUM',
	Hard = 'HARD',
}

export interface ReactSelectOptions {
	value: string;
	label: string;
}

export interface Instruction {
	imageUrl?: string | null | undefined;
	stepNumber: number;
	description: string;
}

export interface Ingredient {
	measurement: string;
	item: string;
	quantity: string;
}

export interface Image {
	secureUrl: string;
	publicId: string;
}

export interface RecipeReaction {
	_id: string;
	recipe: Recipe;
	user: User;
	isLiked: boolean;
}

export interface RecipeEdge {
	cursor: string;
	node: Recipe;
}

export interface Recipe {
	_id: string;
	name: string;
	description: string;
	meals: string[];
	prepTime: number;
	cookingTime: number;
	difficulty: string;
	ingredients: Ingredient[];
	instructions: Instruction[];
	yield: number;
	image: Image;
	isPublic: boolean;
	createdBy: User;
	reaction: RecipeReaction;
	createdAt: Date;
	updatedAt: Date;
}

export interface FormValues {
	name: string;
	recipeDescription: string;
	ingredients: Ingredient[];
	instructions: Instruction[];
	prepTime: number;
	cookingTime: number;
	difficulty: ReactSelectOptions;
	yield: number;
	image: string | File;
	meals: ReactSelectOptions[];
	isPublic: boolean;
}

export interface LikeRecipeMutationVariables {
	input: {
		recipeId: string;
		userId: string;
		isLiked: boolean;
		reactionId: string;
	};
}
