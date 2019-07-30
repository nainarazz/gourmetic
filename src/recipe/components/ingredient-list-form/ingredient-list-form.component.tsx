import React, { ChangeEvent, SFC, useState } from 'react';
import { emptyIngredient } from '../../constants/recipe.constants';
import { FieldArrayRenderProps } from 'formik';
import { FormValues, Ingredient } from '../../types/recipe.interface';
import { GenericInputContainer } from '../../../shared/styles/form';
import { StyledIngredient } from '../recipe-form/recipe-form.style';

interface IngredientListProps {
	formValues: FormValues;
	arrayHelpers: FieldArrayRenderProps;
}

export const IngredientListForm: SFC<IngredientListProps> = ({
	formValues,
	arrayHelpers,
}) => {
	const [ingredient, setIngredient] = useState(emptyIngredient);

	// tslint:disable-next-line:no-any
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name;
		const value = event.target.value;

		const modifiedIngredient: Ingredient = {
			...ingredient,
			[name]: value,
		};
		setIngredient(modifiedIngredient);
	};

	return (
		<React.Fragment>
			{formValues.ingredients.map((ing, index) => {
				return (
					<div key={index}>
						{`${ing.quantity} ${ing.measurement} ${ing.item}`}
						<button
							type="button"
							onClick={() => arrayHelpers.remove(index)}
						>
							Remove Ingredient
						</button>
					</div>
				);
			})}
			<StyledIngredient>
				<GenericInputContainer>
					<label>Quantity</label>
					<input
						name="quantity"
						value={ingredient.quantity}
						onChange={handleChange}
					/>
				</GenericInputContainer>

				<GenericInputContainer>
					<label>Measurement</label>
					<input
						name="measurement"
						value={ingredient.measurement}
						onChange={handleChange}
					/>
				</GenericInputContainer>

				<GenericInputContainer>
					<label>Item</label>
					<input
						value={ingredient.item}
						name="item"
						onChange={handleChange}
					/>
				</GenericInputContainer>
			</StyledIngredient>
			<button
				type="button"
				onClick={() => {
					arrayHelpers.push(ingredient);
					setIngredient(emptyIngredient);
				}}
			>
				Add Ingredient
			</button>
		</React.Fragment>
	);
};
