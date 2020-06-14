import Link from 'next/link';
import React, { useState } from 'react';
import { AvatarWithDropdown } from '../avatar/avatar-dropdown.component';
import { faBars as bars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchBarComponent } from 'src/search/components/search-bar/search-bar.component';
import { useAuth0 } from 'src/authentication/react-auth0-wrapper';
import {
	Container,
	Logo,
	HeaderButton,
	HeaderItems,
	DrawerToggleButton,
	AvatarButton,
	ActionButtons,
} from './header.style';

interface HeaderProps {
	drawerClickHandler(): void;
}

export const Header: React.SFC<HeaderProps> = props => {
	const [inputExpanded, setInputExpanded] = useState(false);
	// tslint:disable:no-any
	const { isAuthenticated, loginWithRedirect, user }: any = useAuth0();

	return (
		<React.Fragment>
			<Container>
				<HeaderItems>
					<DrawerToggleButton
						data-cy="hamburger-icon"
						onClick={props.drawerClickHandler}
					>
						<FontAwesomeIcon icon={bars} />
					</DrawerToggleButton>
					<Link href="/">
						<Logo showLogo={!inputExpanded}>
							<span>gourmetic</span>
						</Logo>
					</Link>
					<SearchBarComponent
						searchInputExpanded={!inputExpanded}
						toggleSearchInput={() => setInputExpanded(!inputExpanded)}
					/>
					<ActionButtons>
						{!isAuthenticated && (
							<HeaderButton onClick={loginWithRedirect}>SIGN IN</HeaderButton>
						)}
						<AvatarButton>
							{isAuthenticated && (
								<AvatarWithDropdown
									pictureUrl={user.picture}
									userName={user.name}
								/>
							)}
						</AvatarButton>
					</ActionButtons>
				</HeaderItems>
			</Container>
		</React.Fragment>
	);
};
