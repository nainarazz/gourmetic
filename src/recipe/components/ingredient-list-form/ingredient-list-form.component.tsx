import React, { SFC } from 'react';
import { emptyIngredient } from '../../constants/recipe.constants';
import { FieldArrayRenderProps } from 'formik';
import { FormValues } from '../../types/recipe.interface';
import { StyledIngredient } from '../recipe-form/recipe-form.style';
import {
	GenericInputContainer,
	Label,
	Input,
} from '../../../shared/styles/form';

interface IngredientListProps {
	formValues: FormValues;
	arrayHelpers: FieldArrayRenderProps;
}

export const IngredientListForm: SFC<IngredientListProps> = ({
	formValues,
	arrayHelpers,
}) => (
	<React.Fragment>
		{formValues.ingredients.map((ingredient, index) => {
			return (
				<StyledIngredient key={index}>
					<GenericInputContainer>
						<Label>Item</Label>
						<Input name={`ingredients[${index}].item`} />
					</GenericInputContainer>

					<GenericInputContainer>
						<Label>Amount</Label>
						<Input name={`ingredients[${index}].quantity`} />
					</GenericInputContainer>

					<GenericInputContainer>
						<Label>Measurement</Label>
						<Input name={`ingredients[${index}].measurement`} />
					</GenericInputContainer>
					<button
						type="button"
						onClick={() => arrayHelpers.remove(index)}
					>
						Remove Ingredient
					</button>
				</StyledIngredient>
			);
		})}
		<button
			type="button"
			onClick={() => arrayHelpers.push(emptyIngredient)}
		>
			Add Ingredient
		</button>
	</React.Fragment>
);
