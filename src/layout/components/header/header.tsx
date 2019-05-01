import React from 'react';
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
						<i />
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
