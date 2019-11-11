import React from 'react';
import { DEFAULT_IMAGE_PLACEHOLDER_PUBLIC_ID } from '../../constants/recipe.constants';
import { ErrorToast } from 'src/shared/components/error-toast/error-toast.component';
import { Image as CloudinaryImage } from 'cloudinary-react';
import { ImageWrapper, RecipeDetailWrapper } from './recipe-detail.styles';
import { Ingredient } from '../../components/ingredients/ingredient.component';
import { Instruction } from '../../components/instructions/instruction.component';
import { NextFunctionComponent } from 'next';
import { RECIPE_DETAIL } from '../../recipe.graphql';
import { RecipeDetailSummary } from '../../components/recipe-summary/recipe-detail-summary.component';
import { Spinner } from 'src/shared/components/spinner/spinner.component';
import { useQuery } from 'react-apollo';

interface RecipeDetailProps {
	id: string;
}

export const RecipeDetailRoot: NextFunctionComponent<
	RecipeDetailProps
> = props => {
	const { data, loading, error } = useQuery(RECIPE_DETAIL, {
		variables: { id: props.id },
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
