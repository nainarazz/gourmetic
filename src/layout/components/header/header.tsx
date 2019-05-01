import React, { useState } from 'react';
import { faBars as bars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchBarComponent } from '../search-bar/search-bar';
import {
	Button,
	Container,
	Logo,
	ButtonsContainer,
	HeaderItems,
	DrawerToggleButton,
} from './styles';

interface HeaderProps {
	drawerClickHandler(): void;
}

export const Header: React.SFC<HeaderProps> = props => {
	const [inputExpanded, setInputExpanded] = useState(false);

	return (
		<React.Fragment>
			<Container>
				<HeaderItems>
					<DrawerToggleButton onClick={props.drawerClickHandler}>
						<FontAwesomeIcon icon={bars} />
					</DrawerToggleButton>
					<Logo showLogo={!inputExpanded}>
						<span>gourmetic</span>
					</Logo>
					<SearchBarComponent
						searchInputExpanded={!inputExpanded}
						searchClickHandler={() =>
							setInputExpanded(!inputExpanded)
						}
					/>
					<ButtonsContainer>
						<Button>Meal Planner</Button>
						<Button>Sign In</Button>
					</ButtonsContainer>
				</HeaderItems>
			</Container>
		</React.Fragment>
	);
};
