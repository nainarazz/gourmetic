import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import createAuth0Client from '@auth0/auth0-spa-js';
import React, { useContext, useEffect, useState } from 'react';

const DEFAULT_REDIRECT_CALLBACK = () =>
	window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext({});
export const useAuth0 = () => useContext(Auth0Context);

export const Auth0Provider = ({
	children,
	onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
	...initOptions
}: Auth0ClientOptions) => {
	const [isAuthenticated, setIsAuthenticated] = useState();
	const [user, setUser] = useState();
	const [auth0Client, setAuth0] = useState<Auth0Client>();
	const [loading, setLoading] = useState(true);
	const [popupOpen, setPopupOpen] = useState(false);

	useEffect(() => {
		const initAuth0 = async () => {
			if (!window.navigator.onLine) {
				setLoading(false);
				return;
			}

			const auth0FromHook = await createAuth0Client(initOptions);
			setAuth0(auth0FromHook);

			if (window.location.search.includes('code=')) {
				const {
					appState,
				} = await auth0FromHook.handleRedirectCallback();
				onRedirectCallback(appState);
			}

			// tslint:disable-next-line:no-shadowed-variable
			const isAuthenticated = await auth0FromHook.isAuthenticated();

			setIsAuthenticated(isAuthenticated);

			if (isAuthenticated) {
				// tslint:disable-next-line:no-shadowed-variable
				const user = await auth0FromHook.getUser();
				setUser(user);
			}

			setLoading(false);
		};
		initAuth0();
	}, []);

	const loginWithPopup = async (params: PopupLoginOptions = {}) => {
		setPopupOpen(true);
		try {
			if (auth0Client) {
				await auth0Client.loginWithPopup(params);
			}
		} catch (error) {
			throw new Error(error);
		} finally {
			setPopupOpen(false);
		}

		// tslint:disable-next-line:no-shadowed-variable
		const user = auth0Client && (await auth0Client.getUser());
		setUser(user);
		setIsAuthenticated(true);
	};

	const handleRedirectCallback = async () => {
		setLoading(true);

		if (auth0Client) {
			await auth0Client.handleRedirectCallback();
		}

		// tslint:disable-next-line:no-shadowed-variable
		const user = auth0Client && (await auth0Client.getUser());
		setLoading(false);
		setIsAuthenticated(true);
		setUser(user);
	};

	return (
		<Auth0Context.Provider
			value={{
				isAuthenticated,
				user,
				loading,
				popupOpen,
				loginWithPopup,
				handleRedirectCallback,
				getIdTokenClaims: (idTokens: getIdTokenClaimsOptions) =>
					auth0Client &&
					auth0Client.getIdTokenClaims({ ...idTokens }),
				loginWithRedirect: (
					redirectLoginOptions: RedirectLoginOptions
				) =>
					auth0Client &&
					auth0Client.loginWithRedirect({ ...redirectLoginOptions }),
				getTokenSilently: (
					getTokenSilentlyOptions: GetTokenSilentlyOptions
				) =>
					auth0Client &&
					auth0Client.getTokenSilently({
						...getTokenSilentlyOptions,
					}),
				getTokenWithPopup: (
					getTokenWithPopupOptions: GetTokenWithPopupOptions
				) =>
					auth0Client &&
					auth0Client.getTokenWithPopup({
						...getTokenWithPopupOptions,
					}),
				logout: (logoutOptions: LogoutOptions) =>
					auth0Client && auth0Client.logout({ ...logoutOptions }),
			}}
		>
			{children}
		</Auth0Context.Provider>
	);
};
