import React, { FunctionComponent } from 'react';
import { RecipeCardContainer } from 'src/recipe/containers/recipe-card/recipe-card.container';
import { RecipeReactionEdge } from 'src/recipe/types/recipe.interface';
import {
	Container,
	CardWrapper,
	CardDescription,
	RecipeName,
	EmptyRecipeList,
} from './my-liked-recipes.style';

interface MyLikedRecipesProps {
	recipeEdges: RecipeReactionEdge[];
}

export const MyLikedRecipes: FunctionComponent<MyLikedRecipesProps> = props => {
	if (!props.recipeEdges) {
		return null;
	}

	const recipes =
		props.recipeEdges.length < 1 ? (
			<EmptyRecipeList>No recipes found.</EmptyRecipeList>
		) : (
			props.recipeEdges.map((e, i) => {
				const previousRecipeId =
					(props.recipeEdges[i - 1] &&
						props.recipeEdges[i - 1].node._id) ||
					'';
				const recipe = e.node.recipe;
				return (
					<CardWrapper key={e.node._id}>
						<RecipeCardContainer
							recipe={recipe}
							previousRecipeId={previousRecipeId}
						/>

						<CardDescription>
							<RecipeName>{recipe && recipe.name}</RecipeName>
						</CardDescription>
					</CardWrapper>
				);
			})
		);
	return <Container>{recipes}</Container>;
};
