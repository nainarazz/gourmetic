import React from 'react';
import { RecipeEdge } from '../../../api/graphql-generated-types/resolvers-types';
import { RecipeList } from '../components/recipe-list/recipe-list';
import { RecipeListComponent } from '../../graphql-generated-types/query-types';

export const RecipeRoot = () => (
	<RecipeListComponent>
		{({ data }) => {
			const result = data && data.recipeList;
			const edges = result && result.edges;
			return <RecipeList recipeEdges={edges as RecipeEdge[]} />;
		}}
	</RecipeListComponent>
);
