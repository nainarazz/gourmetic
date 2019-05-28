import { createLoader } from '../shared/create-loader';
import { getUsersById } from './models/user.model';

export const createUserLoader = () =>
	createLoader((keys: string[]) => getUsersById(keys));
