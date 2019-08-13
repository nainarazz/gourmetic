import React, { ChangeEvent, SFC, useState } from 'react';
import { emptyIngredient } from '../../constants/recipe.constants';
import { FieldArrayRenderProps } from 'formik';
import { FormValues, Ingredient } from '../../types/recipe.interface';
import { StyledIngredient } from '../recipe-form/recipe-form.style';
import {
	GenericInputContainer,
	Label,
	StyledFormikInput,
} from '../../../shared/styles/forms';

interface IngredientListProps {
	formValues: FormValues;
	arrayHelpers: FieldArrayRenderProps;
}

export const IngredientListForm: SFC<IngredientListProps> = ({
	formValues,
	arrayHelpers,
}) => {
	const [ingredient, setIngredient] = useState(emptyIngredient);
	const allFieldsFilled =
		ingredient.item && ingredient.measurement && ingredient.quantity;

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

	const addIngredient = () => {
		if (allFieldsFilled) {
			arrayHelpers.push(ingredient);
			setIngredient(emptyIngredient);
		}
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
					<Label>Quantity</Label>
					<StyledFormikInput
						name="quantity"
						value={ingredient.quantity}
						onChange={handleChange}
					/>
				</GenericInputContainer>

				<GenericInputContainer>
					<Label>Measurement</Label>
					<StyledFormikInput
						name="measurement"
						value={ingredient.measurement}
						onChange={handleChange}
					/>
				</GenericInputContainer>

				<GenericInputContainer>
					<Label>Item</Label>
					<StyledFormikInput
						value={ingredient.item}
						name="item"
						onChange={handleChange}
					/>
				</GenericInputContainer>
			</StyledIngredient>
			<button
				type="button"
				disabled={!allFieldsFilled}
				onClick={() => addIngredient()}
			>
				Add Ingredient
			</button>
		</React.Fragment>
	);
};
