import React, { ChangeEvent, SFC, useState } from 'react';
import { emptyIngredient } from '../../constants/recipe.constants';
import { FieldArrayRenderProps } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormValues, Ingredient } from '../../types/recipe.interface';
import { InputClearButton } from '../../../shared/styles/buttons';
import {
	faPlus as plusIcon,
	faTimesCircle as clearButton,
} from '@fortawesome/free-solid-svg-icons';
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
	ItemIndex,
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

	// a user should be able to enter just the item, or the item, quantity and measurement together
	const allFieldsFilled =
		(
			ingredient.item.trim() &&
			ingredient.measurement.trim() &&
			ingredient.quantity
		).trim() ||
		(ingredient.item.trim() &&
			!ingredient.measurement.trim() &&
			!ingredient.quantity.trim());

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
						<ItemIndex>{index + 1} </ItemIndex>-{' '}
						<span
							style={{ fontSize: '0.8rem' }}
						>{`${ing.quantity} ${ing.measurement} ${ing.item}`}</span>
						<InputClearButton
							type="button"
							onClick={() => arrayHelpers.remove(index)}
						>
							<FontAwesomeIcon icon={clearButton} color="red" />
						</InputClearButton>
					</div>
				);
			})}
			<StyledIngredient>
				<QuantityInputContainer>
					<Label htmlFor="quantity">Quantity</Label>
					<StyledFormikInput
						id="quantity"
						name="quantity"
						value={ingredient.quantity}
						onChange={handleChange}
					/>
				</QuantityInputContainer>

				<MeasurementInputContainer>
					<Label htmlFor="measurement">Measurement</Label>
					<StyledFormikInput
						id="measurement"
						name="measurement"
						value={ingredient.measurement}
						onChange={handleChange}
					/>
				</MeasurementInputContainer>

				<GenericInputContainer>
					<Label htmlFor="ingredient-item">Item</Label>
					<StyledFormikInput
						id="ingredient-item"
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
