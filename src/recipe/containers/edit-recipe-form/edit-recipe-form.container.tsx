import React, { FunctionComponent, useState } from 'react';
import { ErrorToast } from 'src/shared/components/error-toast/error-toast.component';
import { FormValues, Image, Recipe } from '../../types/recipe.interface';
import { getFormattedRecipeData } from '../../recipe.utils';
import { RecipeDetailWrapper } from '../recipe-detail/recipe-detail.styles';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';
import { Spinner } from 'src/shared/components/spinner/spinner.component';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
	RECIPE_DETAIL,
	UPDATE_RECIPE,
	MY_RECIPES_QUERY,
	UPLOAD_IMAGE,
	DELETE_IMAGE,
} from '../../recipe.graphql';

interface EditRecipeProps {
	recipeId: string;
	previousRecipeId?: string;
}

export const EditRecipeFormContainer: FunctionComponent<
	EditRecipeProps
> = props => {
	const [recipe, setRecipe] = useState<Recipe>();

	const { data, loading, error } = useQuery(RECIPE_DETAIL, {
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

	const [uploadImageMutation] = useMutation(UPLOAD_IMAGE);
	const [deleteImageMutation] = useMutation(DELETE_IMAGE);

	const uploadImage = async (
		formValues: FormValues,
		isOfTypeFile: boolean,
		previousImagePublicId: string
	) => {
		// new image
		if (isOfTypeFile && !previousImagePublicId) {
			return uploadImageMutation({
				variables: { file: formValues.image },
			});
		} else {
			// user modified image
			deleteImageMutation({
				variables: { publicId: previousImagePublicId },
			});
			return uploadImageMutation({
				variables: { file: formValues.image },
			});
		}
	};

	const getImageData = async (formValues: FormValues): Promise<Image> => {
		const previousImagePublicId = recipeData.image.publicId;
		const imageUnchanged = recipeData.image.secureUrl === formValues.image;

		if (imageUnchanged) {
			return recipeData.image;
		} else if (formValues.image) {
			// user is uploading a new photo or modifying photo
			const isOfTypeFile =
				typeof formValues.image === 'object' &&
				typeof formValues.image.name === 'string';

			const imageUrl = await uploadImage(
				formValues,
				isOfTypeFile,
				previousImagePublicId
			);

			return {
				secureUrl: imageUrl.data.uploadImage.secureUrl || '',
				publicId: imageUrl.data.uploadImage.publicId || '',
			};
		} else if (previousImagePublicId && !formValues.image) {
			// user removed existing image
			deleteImageMutation({
				variables: { publicId: previousImagePublicId },
			});
		}
		return {
			publicId: '',
			secureUrl: '',
		};
	};

	const handleSubmit = async (
		formValues: FormValues,
		// tslint:disable:no-any
		updateRecipeFn: () => Promise<any>
	) => {
		const formattedRecipe = getFormattedRecipeData(formValues);
		const imageData = await getImageData(formValues);
		formattedRecipe.image = {
			...imageData,
		};

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
			{error && <ErrorToast message="Problem loading recipe." />}
		</React.Fragment>
	);
};
