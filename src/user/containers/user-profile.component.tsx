import React, { SFC } from 'react';
import { TabItem } from 'src/shared/components/tab-item/tab-item.component';
import { Tabs } from 'src/shared/components/tabs/tabs.component';
import {
	UserProfileWrapper,
	UserAccountSection,
	UserActivitySection,
} from './user-profile.style';

export const UserProfileContainer: SFC = () => {
	return (
		<React.Fragment>
			<UserProfileWrapper>
				<UserAccountSection>user account info here</UserAccountSection>
				<UserActivitySection>
					<Tabs>
						<TabItem label="My Recipes">My recipes</TabItem>
						<TabItem label="Liked Recipes">
							my liked recipes
						</TabItem>
					</Tabs>
				</UserActivitySection>
			</UserProfileWrapper>
		</React.Fragment>
	);
};
