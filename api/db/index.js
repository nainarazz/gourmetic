const mongoose = require('mongoose');
require('../recipe/models/Recipe');
require('now-env');
const debug = require('debug')('api');

const connectToDb = async () => {
	try {
		const url = process.env.MONGO_URL || '';
		const connection = await mongoose.connect(url);
		debug('connected to database successfully');
		return connection;
	} catch (error) {
		throw new Error(`There is a problem connecting to database. ${error}`);
	}
};

module.exports = connectToDb;
