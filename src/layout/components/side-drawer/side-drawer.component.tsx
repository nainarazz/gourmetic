import Link from 'next/link';
import React from 'react';
import { Container, SideDrawerItem, SideDrawerLogo } from './side-drawer.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HOME_PAGE_URL } from 'src/shared/constants';
import { useAuth0 } from 'src/authentication/react-auth0-wrapper';
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

export const SideDrawer: React.SFC<SideDrawerProps> = props => {
	// tslint:disable-next-line:no-any
	const { isAuthenticated, loginWithRedirect, logout }: any = useAuth0();
	return (
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
				<SideDrawerItem
					onClick={() => {
						(isAuthenticated ? logout() : loginWithRedirect());
						props.toggleSideDrawer();
					}}
				>
					<FontAwesomeIcon icon={signIn} />
					{!isAuthenticated && (
						<span onClick={loginWithRedirect}>Sign In</span>
					)}
					{isAuthenticated && (
						<span
							onClick={() =>
								logout({
									returnTo: HOME_PAGE_URL,
								})
							}
						>
							Sign Out
						</span>
					)}
				</SideDrawerItem>
			</Container>
		</React.Fragment>
	);
};
