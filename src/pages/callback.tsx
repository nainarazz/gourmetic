import React, { useEffect } from 'react';
import { useAuth0 } from '../authentication/react-auth0-wrapper';

export default () => {
	// tslint:disable-next-line:no-any
	const { isAuthenticated }: any = useAuth0();

	useEffect(() => {
		if (isAuthenticated) {
			window.location.href = '/';
		}
	}, [isAuthenticated]);

	return (
		<React.Fragment>
			<div>loading...</div>
		</React.Fragment>
	);
};
