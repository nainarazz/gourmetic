const mongoose = require('mongoose');

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
	createdAt: Date,
	updatedAt: Date,
});

const Recipe = mongoose.model('recipe', recipeSchema);
module.exports = {
	Recipe,
};
