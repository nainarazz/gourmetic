import React from 'react';
import { NextFunctionComponent } from 'next';
import { RecipeFormContainer } from '../recipe/containers/recipe-form/recipe-form.container';

const NewRecipePage: NextFunctionComponent = () => {
	return (
		<React.Fragment>
			<RecipeFormContainer />
		</React.Fragment>
	);
};

export default NewRecipePage;
