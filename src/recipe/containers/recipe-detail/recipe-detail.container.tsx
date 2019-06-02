import React from 'react';
import { Image, RecipeDetailWrapper } from './recipe-detail.styles';
import { RecipeDetailSummary } from '../../components/recipe-summary/recipe-detail-summary.component';

export const RecipeDetailRoot: React.SFC = () => (
	<React.Fragment>
		<RecipeDetailWrapper>
			<Image>my image here</Image>
			<RecipeDetailSummary
				prepTime={'30'}
				difficulty={'easy'}
				cookTime={'30'}
				description={'recipe description here'}
				author={'Naina Razafindrabiby'}
				title={'Recipe 1'}
			/>
		</RecipeDetailWrapper>
	</React.Fragment>
);
