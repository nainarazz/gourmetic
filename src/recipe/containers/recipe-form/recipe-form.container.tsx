import React from 'react';
import { RecipeDetailWrapper } from '../recipe-detail/recipe-detail.styles';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';

export const RecipeFormContainer = () => {
	return (
		<React.Fragment>
			<RecipeDetailWrapper>
				<RecipeFormComponent />
			</RecipeDetailWrapper>
		</React.Fragment>
	);
};
