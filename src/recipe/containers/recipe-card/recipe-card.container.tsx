import React from 'react';
import { RECIPE_LIST_QUERY } from '../../recipe.graphql';
import { RecipeCard } from '../../components/recipe-card/recipe-card.component';
import {
	LikeRecipeComponent,
	Recipe,
	RecipeReaction,
	LikeRecipeMutationVariables,
} from '../../../graphql-generated-types/query-types';

interface RecipeCardContainerProps {
	recipe: Recipe;
	previousRecipeId: string;
}

export const RecipeCardContainer: React.SFC<
	RecipeCardContainerProps
> = props => {
	let isOptimistic = false;

	const likeRecipeInput: LikeRecipeMutationVariables = {
		input: {
			recipeId: props.recipe._id,
			userId: props.recipe.createdBy && props.recipe.createdBy._id,
			isLiked: props.recipe.reaction && props.recipe.reaction.isLiked,
			reactionId: props.recipe.reaction && props.recipe.reaction._id,
		},
	};

	return (
		<LikeRecipeComponent
			update={(store, { data }) => {
				if (data && data.likeRecipe && data.likeRecipe._id) {
					const reactionId = data.likeRecipe._id;
					const id = parseInt(reactionId, 10);
					isOptimistic = id < 0;
				}
			}}
			variables={likeRecipeInput}
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
					_id: Math.round(Math.random() * -1000000).toString(),
					__typename: 'RecipeReaction',
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
