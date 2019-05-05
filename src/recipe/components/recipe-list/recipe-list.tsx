import React from 'react';
import { Container } from './styles';
import { RecipeCard } from '../recipe-card/recipe-card';

export const RecipeList = () => (
	<Container>
		<RecipeCard />
		<RecipeCard />
		<RecipeCard />
	</Container>
);
