import React from 'react';
import { RECIPE_LIST_QUERY } from '../../recipe.graphql';
import { RecipeCard } from '../../components/recipe-card/recipe-card.component';
import {
	LikeRecipeComponent,
	Recipe,
	RecipeReaction,
} from '../../../graphql-generated-types/query-types';

interface RecipeCardContainerProps {
	recipe: Recipe;
	previousRecipeId: string;
}

export const RecipeCardContainer: React.SFC<
	RecipeCardContainerProps
> = props => {
	let isOptimistic = false;
	return (
		<LikeRecipeComponent
			update={(store, { data }) => {
				if (data && data.likeRecipe && data.likeRecipe.recipe) {
					const id = parseInt(data.likeRecipe.recipe._id, 10);
					isOptimistic = id < 0;
				}
			}}
			variables={{ recipeId: props.recipe._id }}
			refetchQueries={() => [
				{
					query: RECIPE_LIST_QUERY,
					// we need to encode id bcoz pagination for cursor in backend is encoded
					variables: {
						first: 1,
						after: Buffer.from(props.previousRecipeId).toString(
							'base64'
						),
					},
				},
			]}
			optimisticResponse={{
				__typename: 'Mutation',
				likeRecipe: {
					__typename: 'RecipeReaction',
					recipe: {
						__typename: 'Recipe',
						_id: Math.round(Math.random() * -1000000).toString(),
					},
					user: {
						__typename: 'User',
						_id: '5cec0708fb6fc01bf23cec50',
					},
					isLiked: true,
				},
			}}
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

				const recipe = { ...props.recipe };

				if (data) {
					recipe.reaction = {
						...(data.likeRecipe as RecipeReaction),
					};
				}

				return (
					<RecipeCard
						key={props.recipe._id}
						recipe={recipe}
						totalLikes={15}
						username={`${firstname} ${lastname}`}
						likeRecipe={likeRecipe}
						isOptimistic={isOptimistic}
					/>
				);
			}}
		</LikeRecipeComponent>
	);
};
