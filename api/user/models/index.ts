import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		require: true,
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
