import React from 'react';
import { NextFunctionComponent } from 'next';
import { RecipeDetailRoot } from '../recipe/containers/recipe-detail/recipe-detail.container';

interface RecipeDetailProps {
	query: Record<string, string | string[] | undefined>;
}

const RecipePage: NextFunctionComponent<RecipeDetailProps> = props => {
	const id = props.query.id ? (props.query.id as string) : '';
	return (
		<React.Fragment>
			<RecipeDetailRoot id={id} />
		</React.Fragment>
	);
};

RecipePage.getInitialProps = ({ query }) => ({
	query: {
		id: query.id,
	},
});

export default RecipePage;
