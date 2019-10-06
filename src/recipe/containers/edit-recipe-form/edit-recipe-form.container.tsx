import React, { FunctionComponent, useState } from 'react';
import { FormValues, Recipe } from '../../types/recipe.interface';
import { getFormattedRecipeData } from '../../recipe.utils';
import { RECIPE_DETAIL } from '../../recipe.graphql';
import { RecipeDetailWrapper } from '../recipe-detail/recipe-detail.styles';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';
import { uploadImage } from '../../../shared/utils/upload-image';
import { useQuery } from '@apollo/react-hooks';

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

	// TODO: Mutation for updating recipe here

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

	return (
		<React.Fragment>
			<RecipeDetailWrapper>
				<RecipeFormComponent
					recipe={data}
					handleSubmit={(value: FormValues) =>
						handleSubmit(
							value,
							() => new Promise(res => res('updated success'))
						)
					}
				/>
			</RecipeDetailWrapper>
		</React.Fragment>
	);
};
