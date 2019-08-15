import React, { ChangeEvent, SFC, useState } from 'react';
import { emptyIngredient } from '../../constants/recipe.constants';
import { faPlus as plusIcon } from '@fortawesome/free-solid-svg-icons';
import { FieldArrayRenderProps } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormValues, Ingredient } from '../../types/recipe.interface';
import {
	GenericInputContainer,
	Label,
	StyledFormikInput,
} from '../../../shared/styles/forms';
import {
	QuantityInputContainer,
	MeasurementInputContainer,
	StyledIngredient,
	AddButtonSmallScreen,
	AddButtonLargeScreen,
} from './ingredient.style';

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
				<QuantityInputContainer>
					<Label>Quantity</Label>
					<StyledFormikInput
						name="quantity"
						value={ingredient.quantity}
						onChange={handleChange}
					/>
				</QuantityInputContainer>

				<MeasurementInputContainer>
					<Label>Measurement</Label>
					<StyledFormikInput
						name="measurement"
						value={ingredient.measurement}
						onChange={handleChange}
					/>
				</MeasurementInputContainer>

				<GenericInputContainer>
					<Label>Item</Label>
					<StyledFormikInput
						value={ingredient.item}
						name="item"
						onChange={handleChange}
					/>
				</GenericInputContainer>
				<AddButtonLargeScreen
					disabled={!allFieldsFilled}
					onClick={() => addIngredient()}
					type="button"
				>
					<FontAwesomeIcon icon={plusIcon} />
				</AddButtonLargeScreen>
			</StyledIngredient>
			<AddButtonSmallScreen
				disabled={!allFieldsFilled}
				onClick={() => addIngredient()}
				type="button"
			>
				Add
			</AddButtonSmallScreen>
		</React.Fragment>
	);
};
