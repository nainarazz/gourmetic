import React, { FunctionComponent, useState } from 'react';
import { FormValues, Recipe } from '../../types/recipe.interface';
import { getFormattedRecipeData } from '../../recipe.utils';
import { MY_RECIPES_QUERY } from 'src/user/user.graphql';
import { RECIPE_DETAIL, UPDATE_RECIPE } from '../../recipe.graphql';
import { RecipeDetailWrapper } from '../recipe-detail/recipe-detail.styles';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';
import { uploadImage } from '../../../shared/utils/upload-image';
import { useMutation, useQuery } from '@apollo/react-hooks';

interface EditRecipeProps {
	recipeId: string;
}

export const EditRecipeFormContainer: FunctionComponent<
	EditRecipeProps
> = props => {
	const [recipe, setRecipe] = useState<Partial<Recipe>>();

	const { data, loading } = useQuery(RECIPE_DETAIL, {
		variables: { id: props.recipeId },
	});

	const [updateRecipeMutation] = useMutation(UPDATE_RECIPE, {
		variables: { id: props.recipeId, recipe: recipe as Recipe },
		refetchQueries: () => [
			{ query: RECIPE_DETAIL, variables: { id: props.recipeId } },
		],
	});

	const handleSubmit = async (
		formValues: FormValues,
		// tslint:disable-next-line:no-any
		updateRecipeFn: () => Promise<any>
	) => {
		const formattedRecipe = getFormattedRecipeData(formValues);

		if (formValues.image) {
			const imageUrl = await uploadImage(formValues.image as File);
			formattedRecipe.image = {
				secureUrl: imageUrl.secure_url || '',
				publicId: imageUrl.public_id || '',
			};
		}

		setRecipe(formattedRecipe);
		return updateRecipeFn();
	};

	const recipeData = data && data.recipeDetail;
	return (
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
