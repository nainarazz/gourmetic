import React, { useState } from 'react';
import { CREATE_RECIPE, RECIPE_LIST_QUERY } from '../../recipe.graphql';
import { FormValues, Recipe } from '../../types/recipe.interface';
import { getFormattedRecipeData } from '../../recipe.utils';
import { RecipeDetailWrapper } from '../recipe-detail/recipe-detail.styles';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';
import { uploadImage } from '../../../shared/utils/upload-image';
import { useMutation } from '@apollo/react-hooks';

export const RecipeFormContainer = () => {
	const [recipe, setRecipe] = useState<Partial<Recipe>>();

	const [createNewRecipeMutation] = useMutation(CREATE_RECIPE, {
		variables: { input: recipe as Recipe },
		refetchQueries: () => [
			{ query: RECIPE_LIST_QUERY, variables: { first: 15 } },
		],
	});

	const handleSubmit = async (
		formValues: FormValues,
		// tslint:disable-next-line:no-any
		createRecipeFn: () => Promise<any>
	) => {
		const formattedRecipe = getFormattedRecipeData(formValues);

		if (formValues.image) {
			const imageUrl = await uploadImage(formValues.image as File);
			formattedRecipe.image = imageUrl.secure_url || '';
		}

		setRecipe(formattedRecipe);
		return createRecipeFn();
	};

	return (
		<React.Fragment>
			<RecipeDetailWrapper>
				<RecipeFormComponent
					handleSubmit={(value: FormValues) =>
						handleSubmit(value, createNewRecipeMutation)
					}
				/>
			</RecipeDetailWrapper>
		</React.Fragment>
	);
};
