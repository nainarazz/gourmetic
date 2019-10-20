export interface User {
	_id: string;
	OAuthUniqueAccountId: string;
	firstname: string;
	lastname: string;
	email: string;
	photo: string;
}

export interface UserInput {
	OAuthUniqueAccountId: string;
	firstname: string;
	lastname: string;
	email: string;
	photo: string;
}
