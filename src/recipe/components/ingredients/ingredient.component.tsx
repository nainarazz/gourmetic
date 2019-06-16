import React from 'react';
import {
	Contents,
	IngredientsWrapper,
	Item,
	Title
	} from './ingredient.style';
import { Ingredient as IngredientType } from '../../../graphql-generated-types/query-types';

interface IngredientProps {
	ingredients: IngredientType[];
}

export const Ingredient: React.SFC<IngredientProps> = props => (
	<React.Fragment>
		<IngredientsWrapper>
			<Title>Ingredients</Title>
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
