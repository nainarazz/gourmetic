import React from 'react';
import { Container } from './recipe-list.style';
import { RecipeCardContainer } from '../../containers/recipe-card/recipe-card.container';
import { RecipeEdge } from '../../../../api/graphql-generated-types/resolvers-types';

interface RecipeListProps {
	recipeEdges: RecipeEdge[];
}

export const RecipeList: React.SFC<RecipeListProps> = props => {
	if (!props.recipeEdges) {
		return null;
	}
	let previousRecipeId: string;
	const recipes = props.recipeEdges.map((e, i) => {
		previousRecipeId =
			(props.recipeEdges[i - 1] && props.recipeEdges[i - 1].node._id) ||
			'';
		return (
			<RecipeCardContainer
				key={e.node._id}
				recipe={e.node}
				previousRecipeId={previousRecipeId}
			/>
		);
	});
	return <Container>{recipes}</Container>;
};
