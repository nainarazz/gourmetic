import React, { useEffect } from 'react';
import { CREATE_USER } from 'src/recipe/recipe.graphql';
import { useAuth0 } from '../authentication/react-auth0-wrapper';
import { useMutation } from '@apollo/react-hooks';
import { UserInput } from 'src/user/types/user.interface';

// tslint:disable-next-line:no-any
const getUserInput = (OAuthUserObj: any): UserInput => ({
	OAuthUniqueAccountId: OAuthUserObj.sub,
	firstname: OAuthUserObj.given_name,
	lastname: OAuthUserObj.family_name,
	email: OAuthUserObj.email,
	photo: OAuthUserObj.picture,
});

export const callback = () => {
	// tslint:disable-next-line:no-any
	const { isAuthenticated, user }: any = useAuth0();
	const [createNewUser] = useMutation(CREATE_USER);

	useEffect(() => {
		const urlQueryParam = window.location.search;
		const code = urlQueryParam && urlQueryParam.split('?code=')[1];

		// to protect this route from being misused, store the query param in callback url returned by Auth0 in local storage
		// When this effect is called again later, compare the code in storage to the query in URL
		// If it is not the same, immediatedly return users to home page
		if (code) {
			localStorage.setItem('code', code);
		}

		const codeInLocalStorage = localStorage.getItem('code');

		if (code !== codeInLocalStorage) {
			window.location.href = '/';
		}

		const firstLogin = localStorage.getItem('first_login');

		if (firstLogin === null && isAuthenticated && user) {
			const userInput: UserInput = getUserInput(user);
			createNewUser({
				variables: { input: userInput },
			}).then(() => {
				localStorage.setItem('first_login', new Date().toISOString());
				localStorage.removeItem('code');
				window.location.href = '/';
			});
		}

		if (isAuthenticated) {
			localStorage.removeItem('code');
			window.location.href = '/';
		}
	}, [isAuthenticated, user]);

	return <React.Fragment>{<div>loading...</div>}</React.Fragment>;
};

export default callback;
