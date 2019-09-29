import React from 'react';
import { AppLayout } from 'src/layout/containers/app-layout/app-layout.container';
import { NextFunctionComponent } from 'next';
import { ProtectedComponent } from 'src/shared/HOCs/protected-component';
import { RecipeFormContainer } from '../recipe/containers/recipe-form/recipe-form.container';

const NewRecipePage: NextFunctionComponent = () => {
	return (
		<React.Fragment>
			<AppLayout>
				<RecipeFormContainer />
			</AppLayout>
		</React.Fragment>
	);
};

export default ProtectedComponent(NewRecipePage);
