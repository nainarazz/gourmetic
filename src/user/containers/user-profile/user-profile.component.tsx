import React, { SFC } from 'react';
import { MyRecipesContainer } from 'src/recipe/containers/my-recipes/my-recipes.component';
import { TabItem } from 'src/shared/components/tab-item/tab-item.component';
import { Tabs } from 'src/shared/components/tabs/tabs.component';
import { UserProfile } from '../../components/user-profile/user-profile.component';
import {
	UserProfileWrapper,
	UserAccountSection,
	UserActivitySection,
} from './user-profile.style';

export const UserProfileContainer: SFC = () => {
	return (
		<React.Fragment>
			<UserProfileWrapper>
				<UserAccountSection>
					<UserProfile />
				</UserAccountSection>
				<UserActivitySection>
					<Tabs>
						<TabItem label="My Recipes">
							<MyRecipesContainer />
						</TabItem>
						<TabItem label="Liked Recipes">
							my liked recipes
						</TabItem>
					</Tabs>
				</UserActivitySection>
			</UserProfileWrapper>
		</React.Fragment>
	);
};
