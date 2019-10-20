import Link from 'next/link';
import React from 'react';
import Router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth0 } from 'src/authentication/react-auth0-wrapper';
import {
	Container,
	SideDrawerItem,
	SideDrawerLogo,
	StyledAvatar,
} from './side-drawer.style';
import {
	faCalendarAlt as calendar,
	faPlusCircle as addButton,
	faSignInAlt as signIn,
	faHome as home,
	faUser as userIcon,
} from '@fortawesome/free-solid-svg-icons';

interface SideDrawerProps {
	isOpen: boolean;
	toggleSideDrawer: () => void;
}

export const SideDrawer: React.SFC<SideDrawerProps> = props => {
	// tslint:disable:no-any
	const {
		isAuthenticated,
		loginWithRedirect,
		logout,
		user,
	}: any = useAuth0();
	return (
		<React.Fragment>
			<Container isOpen={props.isOpen}>
				<SideDrawerLogo>
					{isAuthenticated && (
						<StyledAvatar
							src={user.picture}
							name={user.name}
							round
							size="40"
						/>
					)}
				</SideDrawerLogo>
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
				<SideDrawerItem
					onClick={() => {
						isAuthenticated
							? Router.push('/recipe-form')
							: loginWithRedirect();
						props.toggleSideDrawer();
					}}
				>
					<FontAwesomeIcon icon={addButton} />
					<span>Create Recipe</span>
				</SideDrawerItem>
				<SideDrawerItem
					onClick={() => {
						isAuthenticated
							? Router.push('/profile')
							: loginWithRedirect();
						props.toggleSideDrawer();
					}}
				>
					<FontAwesomeIcon icon={userIcon} />
					<span>My Profile</span>
				</SideDrawerItem>
				<SideDrawerItem
					onClick={() => {
						isAuthenticated ? logout() : loginWithRedirect();
						props.toggleSideDrawer();
					}}
				>
					<FontAwesomeIcon icon={signIn} />
					<span>{isAuthenticated ? 'Sign Out' : 'Sign In'}</span>
				</SideDrawerItem>
			</Container>
		</React.Fragment>
	);
};
