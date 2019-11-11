import React, { useState } from 'react';
import { DEFAULT_IMAGE_PLACEHOLDER_PUBLIC_ID } from '../../constants/recipe.constants';
import { ErrorToast } from 'src/shared/components/error-toast/error-toast.component';
import { Image as CloudinaryImage } from 'cloudinary-react';
import { ImageWrapper, RecipeDetailWrapper } from './recipe-detail.styles';
import { Ingredient } from '../../components/ingredients/ingredient.component';
import { Instruction } from '../../components/instructions/instruction.component';
import { LIKE_RECIPE, RECIPE_DETAIL } from '../../recipe.graphql';
import { NextFunctionComponent } from 'next';
import { RecipeDetailLikeAction } from './recipe-detail-like-action.component';
import { RecipeDetailSummary } from '../../components/recipe-summary/recipe-detail-summary.component';
import { Spinner } from 'src/shared/components/spinner/spinner.component';
import { useAuth0 } from 'src/authentication/react-auth0-wrapper';
import { useMutation, useQuery } from 'react-apollo';

interface RecipeDetailProps {
	id: string;
}

export const RecipeDetailRoot: NextFunctionComponent<
	RecipeDetailProps
> = props => {
	const [isOptimistic, setIsOptimistic] = useState(false);
	// tslint:disable:no-any
	const { user }: any = useAuth0();

	const { data, loading, error } = useQuery(RECIPE_DETAIL, {
		variables: { id: props.id },
	});

	const [likeRecipe] = useMutation(LIKE_RECIPE, {
		update: (store, updatedData) => {
			const info = updatedData.data;
			if (info && info.likeRecipe && info.likeRecipe._id) {
				const reactionId = info.likeRecipe._id;
				const id = parseInt(reactionId, 10);
				setIsOptimistic(id < 0);
			}
		},
		optimisticResponse: {
			__typename: 'Mutation',
			likeRecipe: {
				_id: Math.round(Math.random() * -1000000).toString(),
				__typename: 'RecipeReaction',
				isLiked: true,
			},
		},
	});

	const recipe = data && data.recipeDetail;
	const instructions =
		recipe && recipe.instructions ? recipe.instructions : [];

	return loading ? (
		<Spinner />
	) : (
		<React.Fragment>
			<RecipeDetailWrapper>
				<ImageWrapper>
					{recipe && (
						<CloudinaryImage
							cloudName="gourmetic"
							dpr="auto"
							width="auto"
							responsive
							quality="auto"
							client_hints="true"
							publicId={
								(recipe && recipe.image.publicId) ||
								DEFAULT_IMAGE_PLACEHOLDER_PUBLIC_ID
							}
						/>
					)}
					<RecipeDetailLikeAction
						likeRecipe={() =>
							likeRecipe({
								variables: {
									input: {
										recipeId: recipe._id,
										userId: user && user.sub,
										isLiked:
											recipe.reaction &&
											recipe.reaction.isLiked,
										reactionId:
											recipe.reaction &&
											recipe.reaction._id,
									},
								},
							})
						}
						isOptimistic={isOptimistic}
						recipe={recipe}
					/>
				</ImageWrapper>
				<RecipeDetailSummary
					prepTime={recipe && recipe.prepTime}
					difficulty={recipe && recipe.difficulty}
					cookTime={recipe && recipe.cookingTime}
					description={(recipe && recipe.description) || ''}
					author={recipe && recipe.createdBy}
					title={recipe && recipe.name}
				/>
				<Ingredient
					ingredients={(recipe && recipe.ingredients) || []}
				/>
				<Instruction instructions={instructions} />
			</RecipeDetailWrapper>
			{error && <ErrorToast message="Problem loading recipe." />}
		</React.Fragment>
	);
};
