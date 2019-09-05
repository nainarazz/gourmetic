import React from 'react';
import { AppLayout } from 'src/layout/containers/app-layout/app-layout.container';
import { RecipeListRoot } from '../recipe/containers/recipe-list/recipe-list.container';

export default () => (
	<React.Fragment>
		<AppLayout>
			<div>here is some criteria stuff/filter</div>
			<RecipeListRoot />
			<div className="footer">here is my footer.</div>
		</AppLayout>
	</React.Fragment>
);
