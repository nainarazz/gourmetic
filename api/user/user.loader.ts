import { createLoader } from '../shared/create-loader';
import { getUsersById, RecipeUserKey } from './models/user.model';

export const createUserLoader = () =>
	createLoader((keys: RecipeUserKey[]) => getUsersById(keys));
