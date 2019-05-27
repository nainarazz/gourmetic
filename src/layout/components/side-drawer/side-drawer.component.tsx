import React from 'react';
import { Container, SideDrawerItem, SideDrawerLogo } from './side-drawer.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCalendarAlt as calendar,
	faSignInAlt as signIn,
	faHome as home,
} from '@fortawesome/free-solid-svg-icons';

interface SideDrawerProps {
	isOpen: boolean;
}

export const SideDrawer: React.SFC<SideDrawerProps> = props => (
	<React.Fragment>
		<Container isOpen={props.isOpen}>
			<SideDrawerLogo />
			<SideDrawerItem>
				<FontAwesomeIcon icon={home} />
				<span>Home</span>
			</SideDrawerItem>
			<SideDrawerItem>
				<FontAwesomeIcon icon={calendar} />
				<span>Meal Planner</span>
			</SideDrawerItem>
			<SideDrawerItem>
				<FontAwesomeIcon icon={signIn} />
				<span>Sign In</span>
			</SideDrawerItem>
		</Container>
	</React.Fragment>
);
