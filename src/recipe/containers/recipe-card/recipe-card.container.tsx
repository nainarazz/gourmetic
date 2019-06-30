import React from 'react';
import { RECIPE_LIST_QUERY } from '../../recipe.graphql';
import { RecipeCard } from '../../components/recipe-card/recipe-card.component';
import {
	LikeRecipeComponent,
	Recipe,
} from '../../../graphql-generated-types/query-types';

interface RecipeCardContainerProps {
	recipe: Recipe;
	previousRecipeId: string;
}

export const RecipeCardContainer: React.SFC<
	RecipeCardContainerProps
> = props => {
	return (
		<LikeRecipeComponent
			refetchQueries={() => [
				{
					query: RECIPE_LIST_QUERY,
					variables: {
						first: 1,
						// we need to encode id because the api expects encoded id for cursor pagination
						after: Buffer.from(props.previousRecipeId).toString(
							'base64'
						),
					},
				},
			]}
			variables={{ recipeId: props.recipe._id }}
		>
			{(likeRecipe, { data }) => {
				const firstname =
					(props.recipe.createdBy &&
						props.recipe.createdBy.firstname) ||
					'';
				const lastname =
					(props.recipe.createdBy &&
						props.recipe.createdBy.lastname) ||
					'';
				return (
					<RecipeCard
						key={props.recipe._id}
						recipe={props.recipe}
						totalLikes={15}
						username={`${firstname} ${lastname}`}
						likeRecipe={likeRecipe}
					/>
				);
			}}
		</LikeRecipeComponent>
	);
};
