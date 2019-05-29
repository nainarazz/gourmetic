import React from 'react';
import { Container } from './recipe-list.style';
import { Recipe } from '../../../graphql-generated-types/query-types';
import { RecipeCard } from '../recipe-card/recipe-card.component';
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
		const firstname =
			(e.node.createdBy && e.node.createdBy.firstname) || '';
		const lastname = (e.node.createdBy && e.node.createdBy.lastname) || '';
		return (
			<RecipeCard
				key={(recipe as Recipe)._id}
				recipe={recipe as Recipe}
				totalLikes={15}
				username={`${firstname} ${lastname}`}
			/>
		);
	});
	return <Container>{recipes}</Container>;
};
