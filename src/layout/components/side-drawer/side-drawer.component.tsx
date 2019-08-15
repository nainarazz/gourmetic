import Link from 'next/link';
import React from 'react';
import { Container, SideDrawerItem, SideDrawerLogo } from './side-drawer.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCalendarAlt as calendar,
	faPlusCircle as addButton,
	faSignInAlt as signIn,
	faHome as home,
} from '@fortawesome/free-solid-svg-icons';

interface SideDrawerProps {
	isOpen: boolean;
	toggleSideDrawer: () => void;
}

export const SideDrawer: React.SFC<SideDrawerProps> = props => (
	<React.Fragment>
		<Container isOpen={props.isOpen}>
			<SideDrawerLogo />
			<SideDrawerItem>
				<Link href={`/`}>
					<div onClick={props.toggleSideDrawer}>
						<FontAwesomeIcon icon={home} />
						<span>Home</span>
					</div>
				</Link>
			</SideDrawerItem>
			<SideDrawerItem>
				<FontAwesomeIcon icon={calendar} />
				<span>Meal Planner</span>
			</SideDrawerItem>
			<SideDrawerItem>
				<Link href={`/new-recipe`} as={`new-recipe`}>
					<div onClick={props.toggleSideDrawer}>
						<FontAwesomeIcon icon={addButton} />
						<span>Create Recipe</span>
					</div>
				</Link>
			</SideDrawerItem>
			<SideDrawerItem>
				<FontAwesomeIcon icon={signIn} />
				<span>Sign In</span>
			</SideDrawerItem>
		</Container>
	</React.Fragment>
);
