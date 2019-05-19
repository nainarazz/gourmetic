import * as faker from 'faker';
import { connectToDb } from '../db';
import { generateRecipe } from './recipe.faker';
// tslint:disable-next-line:no-var-requires
const debug = require('debug')('seeding');

interface RandomNumberParam {
	max: number;
	min: number;
}

// tslint:disable-next-line:ban-types
export const randomAmount = ({ max, min }: RandomNumberParam, cb: Function) => {
	if (!max) {
		throw new Error('randomAmount({ max }): max has to be defined!');
	}
	const n = faker.random.number({ min: min || 0, max });
	const result = [];
	for (let i = 0; i < n; i++) {
		result.push(cb(i));
	}
	return result;
};

const recipes = randomAmount({ max: 100, min: 50 }, () => {
	return generateRecipe();
});

const seed = async () => {
	const db = await connectToDb();
	try {
		await db!.model('recipe').insertMany(recipes);
		debug('successfully seeded');
	} catch (error) {
		throw new Error('failed to seed database. ' + error);
	} finally {
		db!.disconnect();
	}
};

seed();
