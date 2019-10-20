import * as mongoose from 'mongoose';
import DataLoader from 'dataloader';

export interface DataLoaderType {
	user: DataLoader<{}, {}>;
	recipeReaction: DataLoader<{}, {}>;
}

export interface Context {
	db: typeof mongoose | undefined;
	loaders: DataLoaderType;
	// tslint:disable-next-line:no-any
	jwtTokenClaims: JwtTokenClaims | null;
}
