import * as mongoose from 'mongoose';
// tslint:disable-next-line:no-implicit-dependencies
// tslint:disable-next-line:no-var-requires
require('now-env');

export const connectToDb = async (): Promise<typeof mongoose> => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URL);
		// tslint:disable-next-line:no-console
		console.log('connected to database successfully');
		return connection;
	} catch (error) {
		// tslint:disable-next-line:no-console
		console.log('There is a problem connecting to database. ', error);
	}
};
