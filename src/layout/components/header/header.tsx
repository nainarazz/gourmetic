import React from 'react';
import { faSearch as search } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	Container,
	Logo,
	ButtonsContainer,
	HeaderItems,
	SearchBar,
} from './styles';

export const Header = () => (
	<React.Fragment>
		<Container>
			<HeaderItems>
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
