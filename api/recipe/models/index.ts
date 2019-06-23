import * as mongoose from 'mongoose';

export interface Ingredient {
	measurement: string;
	item: string;
	quantity: string;
}

const recipeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	meal: {
		type: [String],
	},
	prepTime: Number,
	cookingTime: Number,
	ingredients: [
		{
			measurement: String,
			item: String,
			quantity: String,
		},
	],
	instructions: [
		{
			imageUrl: String,
			stepNumber: {
				type: Number,
				required: true,
			},
			description: {
				type: String,
				required: true,
			},
		},
	],
	yield: Number,
	image: String,
	dietLabels: [String],
	isPublic: Boolean,
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	createdAt: Date,
	updatedAt: Date,
});

const recipeReactionSchema = new mongoose.Schema({
	recipe: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'recipe',
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	isLiked: Boolean,
});

export const Recipe = mongoose.model('recipe', recipeSchema);
export const RecipeReaction = mongoose.model(
	'recipeReaction',
	recipeReactionSchema
);
