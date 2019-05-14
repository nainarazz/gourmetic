import * as mongoose from 'mongoose';

export interface Context {
	db: typeof mongoose;
}
