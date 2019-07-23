import React from 'react';
import { FormikProps, withFormik } from 'formik';
import { Ingredient, Instruction } from '../../types/recipe.interface';
import {
	IngredientsContainer,
	StyledIngredient,
	InstructionsContainer,
	StyledInstruction,
} from './recipe-form.style';
import {
	FormikForm,
	GenericInputContainer,
	Label,
	Input,
} from '../../../shared/styles/form';

interface FormValues {
	name: string;
	description: string;
	ingredients: Ingredient[];
	instruction: Instruction[];
}

const RecipeForm = (props: FormikProps<FormValues>) => {
	const { values, touched, errors } = props;

	return (
		<FormikForm className="formik-form">
			<GenericInputContainer>
				<Label>Name</Label>
				<Input name={'name'} />
				{errors.name && touched.name && <div>{errors.name}</div>}
			</GenericInputContainer>

			<GenericInputContainer>
				<Label>Description</Label>
				<Input component="textarea" name={'description'} />
			</GenericInputContainer>

			<IngredientsContainer>
				<h4>Ingredients</h4>
				<StyledIngredient>
					<GenericInputContainer>
						<Label>Item</Label>
						<Input name={'name'} />
					</GenericInputContainer>

					<GenericInputContainer>
						<Label>Amount</Label>
						<Input name={'name'} />
					</GenericInputContainer>

					<GenericInputContainer>
						<Label>Measurement</Label>
						<Input name={'name'} />
					</GenericInputContainer>
				</StyledIngredient>
				<button>Add Ingredient</button>
			</IngredientsContainer>

			<InstructionsContainer>
				<h4>Instructions</h4>
				<StyledInstruction>
					<span>1</span>
					<GenericInputContainer>
						<Input name={'name'} />
					</GenericInputContainer>
					<button>x</button>
				</StyledInstruction>
				<button>Add Instruction</button>
			</InstructionsContainer>

			<button type="submit">Submit</button>
		</FormikForm>
	);
};

export const RecipeFormComponent = withFormik<{}, FormValues>({
	mapPropsToValues: () => ({
		description: '',
		name: '',
		instruction: [],
		ingredients: [],
	}),

	validate: values => {
		// tslint:disable-next-line:no-any
		const errors: any = {};

		if (!values.name) {
			errors.name = 'Required';
		}

		return errors;
	},

	handleSubmit: (values, { setSubmitting }) => {
		setTimeout(() => {
			alert(JSON.stringify(values, null, 2));
			setSubmitting(false);
		}, 1000);
	},
	// displayName: 'RecipeForm',
})(RecipeForm);
