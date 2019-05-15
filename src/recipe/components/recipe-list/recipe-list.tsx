import React from 'react';
import { Container } from './styles';
import { RecipeCard } from '../recipe-card/recipe-card';
import { RecipeListComponent } from '../../../graphql-generated-types/query-types';

export const RecipeList = () => (
	<Container>
		<RecipeListComponent>
			{() => {
				return <RecipeCard />;
			}}
		</RecipeListComponent>
	</Container>
);
