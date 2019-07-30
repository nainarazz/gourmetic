import React from 'react';
import { CustomMultiSelect } from '../../../shared/components/select/select.component';
import {
	FieldArray,
	FieldProps,
	FormikProps,
	withFormik
	} from 'formik';
import { FormValues } from '../../types/recipe.interface';
import { IngredientListForm } from '../ingredients/ingredient-list-form.component';
import { InstructionListForm } from '../instructions/instruction-list-form.component';
import { mealTypeOptions } from '../../constants/recipe.constants';
import {
	IngredientsContainer,
	InstructionsContainer,
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
				<FieldArray
					name={'ingredients'}
					render={arrayHelpers => (
						<IngredientListForm
							formValues={values}
							arrayHelpers={arrayHelpers}
						/>
					)}
				/>
			</IngredientsContainer>

			<InstructionsContainer>
				<h4>Instructions</h4>
				<FieldArray
					name={'instructions'}
					render={arrayHelpers => (
						<InstructionListForm
							formValues={values}
							arrayHelpers={arrayHelpers}
						/>
					)}
				/>
				<button type="button">Add Instruction</button>
			</InstructionsContainer>

			<div className="meal-type">
				<h4>Meal Categories</h4>
				<Input name={'mealType'}>
					{({ field, form }: FieldProps) => (
						<CustomMultiSelect
							options={mealTypeOptions}
							handleChange={val =>
								form.setFieldValue('mealType', val)
							}
							selectedValues={field.value}
						/>
					)}
				</Input>
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
		mealType: [],
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
