import React from 'react';
import { RecipeList } from '../recipe/components/recipe-list/recipe-list';
import { RecipeRoot } from '../recipe/containers/recipe-root';

export default () => (
	<React.Fragment>
		<div>here is some criteria stuff/filter</div>
		<RecipeRoot />
		<div className="footer">here is my footer.</div>
	</React.Fragment>
);
