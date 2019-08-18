import React, { useState } from 'react';
import { CreateRecipeComponent } from '../../../graphql-generated-types/query-types';
import { FormValues, Recipe } from '../../types/recipe.interface';
import { getFormattedRecipeData } from '../../recipe.utils';
import { RecipeDetailWrapper } from '../recipe-detail/recipe-detail.styles';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';
import { uploadImage } from '../../../shared/utils/upload-image';

export const RecipeFormContainer = () => {
	const [recipe, setRecipe] = useState<Partial<Recipe>>();

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
				<CreateRecipeComponent variables={{ input: recipe as Recipe }}>
					{createRecipe => {
						return (
							<RecipeFormComponent
								handleSubmit={(value: FormValues) =>
									handleSubmit(value, createRecipe)
								}
							/>
						);
					}}
				</CreateRecipeComponent>
			</RecipeDetailWrapper>
		</React.Fragment>
	);
};
