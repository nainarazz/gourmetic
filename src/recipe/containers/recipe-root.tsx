import React from 'react';
import { Recipe } from '../../../api/graphql-generated-types/resolvers-types';
import { RecipeList } from '../components/recipe-list/recipe-list';
import { RecipeListComponent } from '../../graphql-generated-types/query-types';

export const RecipeRoot = () => (
	<RecipeListComponent>
		{({ data }) => {
			const recipes = data && data!.recipeList;
			return <RecipeList recipes={recipes as Recipe[]} />;
		}}
	</RecipeListComponent>
);
