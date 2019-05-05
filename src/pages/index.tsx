import React from 'react';
import { RecipeList } from '../recipe/components/recipe-list/recipe-list';

export default () => (
	<React.Fragment>
		<div>here is some criteria stuff/filter</div>
		<RecipeList />
		<div className="footer">here is my footer.</div>
	</React.Fragment>
);
