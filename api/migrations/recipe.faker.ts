import * as faker from 'faker';
import { pickRandom } from './utils';
import { userIds } from './constants';

const meals = ['BREAKFAST', 'LUNCH', 'SUPPER', 'SNACK', 'DESSERT', 'ENTREE'];
const measurements = ['kg', 'grams', 'pieces', 'teaspoon', 'tablespoon'];

export const generateRecipe = () => ({
	name: faker.lorem.word(),
	description: faker.lorem.sentence(),
	meal: faker.random.arrayElement(meals),
	prepTime: faker.random.number({ min: 5, max: 60 }),
	cookingTime: faker.random.number({ min: 5, max: 60 }),
	ingredients: createIngredients(faker.random.number({ min: 3, max: 10 })),
	instructions: createInstructions(faker.random.number({ min: 3, max: 10 })),
	yield: faker.random.number({ min: 1, max: 5 }),
	image: {
		publicId: '',
		secureUrl: '',
	},
	isPublic: faker.random.boolean(),
	createdBy: pickRandom(userIds),
	createdAt: new Date(),
	updatedAt: new Date(),
});

const createIngredient = () => ({
	measurement: faker.random.arrayElement(measurements),
	item: faker.random.word(),
	quantity: faker.random.number({ min: 1, max: 5 }),
});

const createIngredients = (numOfIngredients: number) =>
	Array.from({ length: numOfIngredients }, createIngredient);

const createInstruction = () => ({
	imageUrl: '',
	stepNumber: faker.random.number({ min: 1, max: 5 }),
	description: faker.lorem.sentence(),
});

const createInstructions = (num: number) =>
	Array.from({ length: num }, createInstruction);
