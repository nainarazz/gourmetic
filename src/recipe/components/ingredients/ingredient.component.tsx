import React from 'react';
import {
	Contents,
	IngredientsWrapper,
	Item,
	Title
	} from './ingredient.style';
import { Ingredient as IngredientType } from '../../types/recipe.interface';

interface IngredientProps {
	ingredients: IngredientType[];
}

export const Ingredient: React.SFC<IngredientProps> = props => (
	<React.Fragment>
		<IngredientsWrapper>
			<Title>INGREDIENTS</Title>
			<Contents>
				{props.ingredients.map((ingredient, index) => (
					<Item key={index}>
						<span>
							{ingredient.quantity} {ingredient.measurement}{' '}
							{ingredient.item}
						</span>
					</Item>
				))}
			</Contents>
		</IngredientsWrapper>
	</React.Fragment>
);
