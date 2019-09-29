import React from 'react';
import { AppLayout } from 'src/layout/containers/app-layout/app-layout.container';
import { NextFunctionComponent } from 'next';
import { UserProfileContainer } from 'src/user/containers/user-profile.component';

const ProfilePage: NextFunctionComponent = () => {
	return (
		<React.Fragment>
			<AppLayout>
				<UserProfileContainer />
			</AppLayout>
		</React.Fragment>
	);
};

export default ProfilePage;