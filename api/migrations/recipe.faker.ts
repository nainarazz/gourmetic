import * as faker from 'faker';

const meals = ['BREAKFAST', 'LUNCH', 'SUPPER', 'SNACK', 'DESSERT', 'ENTREE'];
const measurements = ['kg', 'grams', 'pieces', 'teaspoon', 'tablespoon'];
const dietLabels = ['LOW_SALT', 'HIGH_PROTEIN', 'VEGAN'];

export const generateRecipe = () => ({
	name: faker.lorem.word(),
	description: faker.lorem.sentence(),
	meal: faker.random.arrayElement(meals),
	prepTime: faker.random.number({ min: 5, max: 60 }),
	cookingTime: faker.random.number({ min: 5, max: 60 }),
	ingredients: {
		measurement: faker.random.arrayElement(measurements),
		item: faker.random.word(),
		quantity: faker.random.number({ min: 1, max: 5 }),
	},
	instructions: {
		imageUrl: '',
		stepNumber: faker.random.number({ min: 1, max: 5 }),
		description: faker.lorem.sentence(),
	},
	yield: faker.random.number({ min: 1, max: 5 }),
	image: '',
	dietLabels: faker.random.arrayElement(dietLabels),
	isPublic: faker.random.boolean(),
	createdBy: '5cec0708fb6fc01bf23cec50',
	createdAt: new Date(),
	updatedAt: new Date(),
});
