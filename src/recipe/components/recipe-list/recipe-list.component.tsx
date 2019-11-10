import Avatar from 'react-avatar';
import React from 'react';
import { RecipeCardContainer } from '../../containers/recipe-card/recipe-card.container';
import { RecipeEdge } from '../../types/recipe.interface';
import {
	Container,
	CardWrapper,
	CardDescription,
	RecipeName,
	RecipeAuthor,
	EmptyRecipeList,
} from './recipe-list.style';

interface RecipeListProps {
	recipeEdges: RecipeEdge[];
}

export const RecipeList: React.SFC<RecipeListProps> = props => {
	if (!props.recipeEdges) {
		return null;
	}
	let previousRecipeId: string;
	const recipes =
		props.recipeEdges.length < 1 ? (
			<EmptyRecipeList>No recipes found.</EmptyRecipeList>
		) : (
			props.recipeEdges.map((e, i) => {
				previousRecipeId =
					(props.recipeEdges[i - 1] &&
						props.recipeEdges[i - 1].node._id) ||
					'';
				const recipe = e.node;
				return (
					<CardWrapper key={e.node._id}>
						<RecipeCardContainer
							recipe={e.node}
							previousRecipeId={previousRecipeId}
						/>

						<CardDescription>
							<RecipeName>{recipe && recipe.name}</RecipeName>
							<RecipeAuthor>
								<Avatar
									src={recipe.createdBy.photo}
									round
									size="20"
									style={{ marginRight: '5px' }}
								/>
								{`by ${recipe.createdBy.firstname} ${recipe.createdBy.lastname}`}
							</RecipeAuthor>
						</CardDescription>
					</CardWrapper>
				);
			})
		);
	return <Container>{recipes}</Container>;
};
