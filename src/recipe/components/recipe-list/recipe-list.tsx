import React from 'react';
import { Container } from './styles';
import { Recipe } from '../../../graphql-generated-types/query-types';
import { RecipeCard } from '../recipe-card/recipe-card';

interface RecipeListProps {
	recipes: Recipe[];
}

export const RecipeList: React.SFC<RecipeListProps> = props => {
	const recipes = props.recipes.map(r => (
		<RecipeCard
			key={(r as Recipe)._id}
			recipe={r as Recipe}
			totalLikes={15}
			username={'naina'}
		/>
	));

	return <Container>{recipes}</Container>;
};
