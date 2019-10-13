import React, { FunctionComponent, useState } from 'react';
import { deleteImage, uploadImage } from '../../../shared/utils/upload-image';
import { FormValues, Recipe } from '../../types/recipe.interface';
import { getFormattedRecipeData } from '../../recipe.utils';
import { RecipeDetailWrapper } from '../recipe-detail/recipe-detail.styles';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';
import { Spinner } from 'src/shared/components/spinner/spinner.component';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
	RECIPE_DETAIL,
	UPDATE_RECIPE,
	MY_RECIPES_QUERY,
} from '../../recipe.graphql';

interface EditRecipeProps {
	recipeId: string;
	previousRecipeId?: string;
}

export const EditRecipeFormContainer: FunctionComponent<
	EditRecipeProps
> = props => {
	const [recipe, setRecipe] = useState<Partial<Recipe>>();

	const { data, loading } = useQuery(RECIPE_DETAIL, {
		variables: { id: props.recipeId },
	});

	const recipeData = data && data.recipeDetail;

	const [updateRecipeMutation] = useMutation(UPDATE_RECIPE, {
		variables: { id: props.recipeId, recipe: recipe as Recipe },
		refetchQueries: () => [
			{ query: RECIPE_DETAIL, variables: { id: props.recipeId } },
			{
				query: MY_RECIPES_QUERY,
				variables: {
					first: 1,
					after: Buffer.from(
						(props && props.previousRecipeId) || ''
					).toString('base64'),
				},
			},
		],
	});

	const handleSubmit = async (
		formValues: FormValues,
		// tslint:disable-next-line:no-any
		updateRecipeFn: () => Promise<any>
	) => {
		const formattedRecipe = getFormattedRecipeData(formValues);

		const previousImagePublicId = recipeData.image.publicId;
		if (formValues.image) {
			const isNewImage =
				typeof (formValues.image === 'object') &&
				formValues.image.hasOwnProperty('name');

			const imageUrl = await uploadImage(
				formValues.image,
				isNewImage,
				previousImagePublicId
			);
			formattedRecipe.image = {
				secureUrl: imageUrl.secure_url || '',
				publicId: imageUrl.public_id || '',
			};
		} else if (previousImagePublicId && !formValues.image) {
			// TODO
			// user removed existing image
			// await deleteImage(previousImagePublicId);
		}

		setRecipe(formattedRecipe);
		return updateRecipeFn();
	};

	return loading ? (
		<Spinner />
	) : (
		<React.Fragment>
			<RecipeDetailWrapper>
				<RecipeFormComponent
					recipe={recipeData}
					handleSubmit={(value: FormValues) =>
						handleSubmit(value, updateRecipeMutation)
					}
				/>
			</RecipeDetailWrapper>
		</React.Fragment>
	);
};
