import Link from 'next/link';
import React, { useState } from 'react';
import { faBars as bars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { useAuth0 } from 'src/authentication/react-auth0-wrapper';
import {
	Button,
	Container,
	Logo,
	ButtonsContainer,
	HeaderItems,
	DrawerToggleButton,
} from './header.style';

interface HeaderProps {
	drawerClickHandler(): void;
}

export const Header: React.SFC<HeaderProps> = props => {
	const [inputExpanded, setInputExpanded] = useState(false);
	// tslint:disable-next-line:no-any
	const { isAuthenticated, loginWithRedirect, logout }: any = useAuth0();

	return (
		<React.Fragment>
			<Container>
				<HeaderItems>
					<DrawerToggleButton onClick={props.drawerClickHandler}>
						<FontAwesomeIcon icon={bars} />
					</DrawerToggleButton>
					<Link href="/">
						<Logo showLogo={!inputExpanded}>
							<span>gourmetic</span>
						</Logo>
					</Link>
					<SearchBarComponent
						searchInputExpanded={!inputExpanded}
						searchClickHandler={() =>
							setInputExpanded(!inputExpanded)
						}
					/>
					<ButtonsContainer>
						<Button>Meal Planner</Button>
						{!isAuthenticated && (
							<Button onClick={() => loginWithRedirect({})}>
								Sign In
							</Button>
						)}
						{isAuthenticated && (
							<Button onClick={logout}>Sign out</Button>
						)}
					</ButtonsContainer>
				</HeaderItems>
			</Container>
		</React.Fragment>
	);
};
