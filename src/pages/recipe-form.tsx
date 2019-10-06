import React from 'react';
import { AppLayout } from 'src/layout/containers/app-layout/app-layout.container';
import { EditRecipeFormContainer } from 'src/recipe/containers/edit-recipe-form/edit-recipe-form.container';
import { NextFunctionComponent } from 'next';
import { ProtectedComponent } from 'src/shared/HOCs/protected-component';
import { RecipeFormContainer } from 'src/recipe/containers/new-recipe-form/new-recipe-form.container';

interface RecipeFormProps {
	query?: Record<string, string | string[] | undefined>;
}

const RecipeFormPage: NextFunctionComponent<RecipeFormProps> = props => {
	const queryParams = props.query;
	const id = (queryParams && (queryParams.id as string)) || '';
	const user = (queryParams && queryParams.user) || '';

	return (
		<React.Fragment>
			<AppLayout>
				{id && user ? (
					<EditRecipeFormContainer recipeId={id} />
				) : (
					<RecipeFormContainer />
				)}
			</AppLayout>
		</React.Fragment>
	);
};

RecipeFormPage.getInitialProps = ({ query }) => ({
	query: {
		id: query.id,
		user: query.user,
	},
});

export default ProtectedComponent(RecipeFormPage);
