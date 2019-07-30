import React from 'react';
import { FieldArray, FormikProps, withFormik } from 'formik';
import { FormValues } from '../../types/recipe.interface';
import { IngredientListForm } from '../ingredients/ingredient-list-form.component';
import { InstructionListForm } from '../instructions/instruction-list-form.component';
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

const RecipeForm = (props: FormikProps<FormValues>) => {
	const { values, touched, errors } = props;

	return (
		<FormikForm className="formik-form">
			<div className="image">
				<Input type="file" name={'image'} />
			</div>
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
				<div>
					<FieldArray
						name={'ingredients'}
						render={arrayHelpers => (
							<IngredientListForm
								formValues={values}
								arrayHelpers={arrayHelpers}
							/>
						)}
					/>
				</div>
			</IngredientsContainer>

			<InstructionsContainer>
				<h4>Instructions</h4>
				<div>
					<FieldArray
						name={'instructions'}
						render={arrayHelpers => (
							<InstructionListForm
								formValues={values}
								arrayHelpers={arrayHelpers}
							/>
						)}
					/>
				</div>
				<button type="button">Add Instruction</button>
			</InstructionsContainer>

			<div className="meal-type">
				<h4>Meal Categories</h4>
				<div>Breakfast</div>
				<div>Lunch</div>
			</div>
			<button type="submit">Submit</button>
		</FormikForm>
	);
};

export const RecipeFormComponent = withFormik<{}, FormValues>({
	mapPropsToValues: () => ({
		name: '',
		description: '',
		instructions: [],
		ingredients: [],
		prepTime: 0,
		cookingTime: 0,
		difficulty: '',
		yield: 0,
		image: '',
		mealType: '',
		isPublic: false,
	}),

	validate: values => {
		// tslint:disable-next-line:no-any
		const errors: any = {};

		// if (!values.name) {
		// 	errors.name = 'Required';
		// }

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
