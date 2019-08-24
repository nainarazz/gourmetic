import React, { useState } from 'react';
import { LIKE_RECIPE, RECIPE_LIST_QUERY } from '../../recipe.graphql';
import { RecipeCard } from '../../components/recipe-card/recipe-card.component';
import { useMutation } from 'react-apollo';
import {
	Recipe,
	LikeRecipeMutationVariables,
} from '../../types/recipe.interface';

interface RecipeCardContainerProps {
	recipe: Recipe;
	previousRecipeId: string;
}

export const RecipeCardContainer: React.SFC<
	RecipeCardContainerProps
> = props => {
	const [isOptimistic, setIsOptimistic] = useState(false);

	const likeRecipeInput: LikeRecipeMutationVariables = {
		input: {
			recipeId: props.recipe._id,
			userId: props.recipe.createdBy && props.recipe.createdBy._id,
			isLiked: props.recipe.reaction && props.recipe.reaction.isLiked,
			reactionId: props.recipe.reaction && props.recipe.reaction._id,
		},
	};

	const [likeRecipe, { data }] = useMutation(LIKE_RECIPE, {
		variables: likeRecipeInput,
		// tslint:disable-next-line:no-shadowed-variable
		update: (store, updatedData) => {
			const info = updatedData.data;
			if (info && info.likeRecipe && info.likeRecipe._id) {
				const reactionId = info.likeRecipe._id;
				const id = parseInt(reactionId, 10);
				setIsOptimistic(id < 0);
			}
		},
		refetchQueries: () => [
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
		],
		optimisticResponse: {
			__typename: 'Mutation',
			likeRecipe: {
				_id: Math.round(Math.random() * -1000000).toString(),
				__typename: 'RecipeReaction',
				isLiked: true,
			},
		},
	});

	const firstname =
		(props.recipe.createdBy && props.recipe.createdBy.firstname) || '';
	const lastname =
		(props.recipe.createdBy && props.recipe.createdBy.lastname) || '';

	const recipe = { ...props.recipe };

	if (data) {
		recipe.reaction = {
			// tslint:disable-next-line:no-any
			...(data.likeRecipe as any),
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
};
