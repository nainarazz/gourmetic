import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	providerId: {
		type: String,
		required: true,
	},
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
});

export const User = mongoose.model('user', userSchema);
