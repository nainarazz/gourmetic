import React from 'react';
import {
	Contents,
	IngredientsWrapper,
	Item,
	Title
	} from './ingredient.style';

export const Ingredient: React.SFC = () => (
	<React.Fragment>
		<IngredientsWrapper>
			<Title>Ingredients</Title>
			<Contents>
				<Item>3/4 cups flour</Item>
				<Item>2 large eggs</Item>
				<Item>1/4 spoon salt</Item>
				<Item>2 cups raising</Item>
				<Item>1 teaspoon sugar</Item>
			</Contents>
		</IngredientsWrapper>
	</React.Fragment>
);
