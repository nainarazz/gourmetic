import React, { useState } from 'react';
import { CreateRecipeComponent } from '../../../graphql-generated-types/query-types';
import { Recipe } from '../../types/recipe.interface';
import { RecipeDetailWrapper } from '../recipe-detail/recipe-detail.styles';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';

export const RecipeFormContainer = () => {
	const [recipe, setRecipe] = useState<Partial<Recipe>>();

	const handleSubmit = (
		rec: Partial<Recipe>,
		// tslint:disable-next-line:no-any
		createRecipeFn: () => Promise<any>
	) => {
		setRecipe(rec);
		return createRecipeFn();
	};
	return (
		<React.Fragment>
			<RecipeDetailWrapper>
				<CreateRecipeComponent variables={{ input: recipe as Recipe }}>
					{createRecipe => {
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
