import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSearch as search,
	faBars as bars,
} from '@fortawesome/free-solid-svg-icons';
import {
	Button,
	Container,
	Logo,
	ButtonsContainer,
	HeaderItems,
	SearchBar,
	DrawerToggleButton,
} from './styles';

interface HeaderProps {
	drawerClickHandler(): void;
}

export const Header: React.SFC<HeaderProps> = props => (
	<React.Fragment>
		<Container>
			<HeaderItems>
				<DrawerToggleButton onClick={props.drawerClickHandler}>
					<FontAwesomeIcon icon={bars} />
				</DrawerToggleButton>
				<Logo>
					<span>gourmetic</span>
				</Logo>
				<SearchBar>
					<input
						type="text"
						placeholder="What food are you looking for?"
					/>
					<button type="submit">
						<FontAwesomeIcon icon={search} />
					</button>
				</SearchBar>
				<ButtonsContainer>
					<Button>Meal Planner</Button>
					<Button>Sign In</Button>
				</ButtonsContainer>
			</HeaderItems>
		</Container>
	</React.Fragment>
);
