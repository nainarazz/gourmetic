import React from 'react';
import { Container } from './styles';
import { Recipe } from '../../../graphql-generated-types/query-types';
import { RecipeCard } from '../recipe-card/recipe-card';
import { RecipeEdge } from '../../../../api/graphql-generated-types/resolvers-types';

interface RecipeListProps {
	recipeEdges: RecipeEdge[];
}

export const RecipeList: React.SFC<RecipeListProps> = props => {
	if (!props.recipeEdges) {
		return null;
	}
	const recipes = props.recipeEdges.map(e => {
		const recipe = e.node;
		return (
			<RecipeCard
				key={(recipe as Recipe)._id}
				recipe={recipe as Recipe}
				totalLikes={15}
				username={'naina'}
			/>
		);
	});
	return <Container>{recipes}</Container>;
};
