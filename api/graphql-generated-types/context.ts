import * as mongoose from 'mongoose';
import DataLoader from 'dataloader';

interface DataLoaderType {
	user: DataLoader<{}, {}>;
}

export interface Context {
	db: typeof mongoose;
	loaders: DataLoaderType;
}
