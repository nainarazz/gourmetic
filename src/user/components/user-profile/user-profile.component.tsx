import React, { SFC } from 'react';
import { useAuth0 } from 'src/authentication/react-auth0-wrapper';
import {
	ProfileContainer,
	CoverImage,
	StyledAvatar,
	UserName,
	UserEmail,
} from './user-profile.style';

export const UserProfile: SFC = () => {
	// tslint:disable-next-line:no-any
	const { user }: any = useAuth0();

	return (
		<React.Fragment>
			<ProfileContainer>
				<CoverImage>
					<StyledAvatar
						size="55"
						round
						name={user.name}
						src={user.picture}
					/>
				</CoverImage>
				<UserName>{user.name}</UserName>
				<UserEmail>{user.email}</UserEmail>
			</ProfileContainer>
		</React.Fragment>
	);
};
