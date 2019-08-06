import React, { useState } from 'react';
import { CreateRecipeComponent } from '../../../graphql-generated-types/query-types';
import { Recipe } from '../../types/recipe.interface';
import { RecipeDetailWrapper } from '../recipe-detail/recipe-detail.styles';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';

export const RecipeFormContainer = () => {
	const [recipe, useRecipe] = useState<Partial<Recipe>>();

	const handleSubmit = (rec: Partial<Recipe>, createRecipeFn: () => void) => {
		useRecipe(rec);
		createRecipeFn();
	};
	return (
		<React.Fragment>
			<RecipeDetailWrapper>
				<CreateRecipeComponent variables={{ input: recipe as Recipe }}>
					{(createRecipe, { data }) => {
						return (
							<RecipeFormComponent
								handleSubmit={(value: Partial<Recipe>) =>
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
