import * as mongoose from 'mongoose';
import '../recipe/models/Recipe.model';
// tslint:disable-next-line:no-var-requires
require('now-env');
// tslint:disable-next-line:no-var-requires
const debug = require('debug')('api');

export const connectToDb = async (): Promise<typeof mongoose | undefined> => {
	try {
		const url = process.env.MONGO_URL || '';
		const connection = await mongoose.connect(url);
		debug('connected to database successfully');
		return connection;
	} catch (error) {
		throw new Error(`There is a problem connecting to database. ${error}`);
	}
};
