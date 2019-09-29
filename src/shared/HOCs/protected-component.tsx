import React, { useEffect } from 'react';
import Router from 'next/router';
import { Spinner } from '../components/spinner/spinner.component';
import { useAuth0 } from 'src/authentication/react-auth0-wrapper';

export const ProtectedComponent = (Component: React.ComponentType) => {
	// tslint:disable:no-any
	return (props: any) => {
		const { isAuthenticated, checkingAuthentication }: any = useAuth0();
		useEffect(() => {
			if (!isAuthenticated && !checkingAuthentication) {
				Router.push('/');
			}
		}, [checkingAuthentication]);

		return !isAuthenticated || checkingAuthentication ? (
			<Spinner />
		) : (
			<React.Fragment>
				<Component {...props} />
			</React.Fragment>
		);
	};
};
