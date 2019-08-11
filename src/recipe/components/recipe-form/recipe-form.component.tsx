import * as Yup from 'yup';
import React from 'react';
import { getFormattedRecipeData } from './recipe-form.utils';
import { IngredientListForm } from '../ingredients/ingredient-list-form.component';
import { InstructionListForm } from '../instructions/instruction-list-form.component';
import {
	FormValues,
	ReactSelectOptions,
	Recipe,
} from '../../types/recipe.interface';
import {
	FieldArray,
	FieldProps,
	FormikProps,
	withFormik,
	ErrorMessage,
} from 'formik';
import {
	CustomMultiSelect,
	CustomSelect,
} from '../../../shared/components/select/select.component';
import {
	mealTypeOptions,
	recipeDifficulties,
} from '../../constants/recipe.constants';
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

interface RecipeFormProps {
	handleSubmit: (recipe: Partial<Recipe>) => Promise<void>;
}

const RecipeForm = (props: FormikProps<FormValues>) => {
	const { values, isSubmitting } = props;

	return (
		<FormikForm className="formik-form">
			<div className="image">
				<Input type="file" name={'image'} />
			</div>
			<GenericInputContainer>
				<Label>Name</Label>
				<Input name={'name'} />
				<ErrorMessage name="name" />
			</GenericInputContainer>

			<GenericInputContainer>
				<Label>Description</Label>
				<Input component="textarea" name={'description'} />
				<ErrorMessage name="description" />
			</GenericInputContainer>

			<GenericInputContainer>
				<Label>Prep Time</Label>
				<Input name={'prepTime'} type="number" min="0" />
				<span>min</span>
			</GenericInputContainer>

			<GenericInputContainer>
				<Label>Cooking Time</Label>
				<Input name={'cookingTime'} type="number" min="0" />
				<span>min</span>
			</GenericInputContainer>

			<GenericInputContainer>
				<Label>Difficulty</Label>
				<Input name={'difficulty'}>
					{({ field, form }: FieldProps) => (
						<CustomSelect
							options={recipeDifficulties}
							handleChange={val =>
								form.setFieldValue('difficulty', val.value)
							}
							selectedValue={field.value}
						/>
					)}
				</Input>
				<ErrorMessage name="difficulty" />
			</GenericInputContainer>

			<GenericInputContainer>
				<Label>Yield</Label>
				<Input name={'yield'} type="number" min="0" />
				<ErrorMessage name="yield" />
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
				<ErrorMessage name="ingredients" />
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
				<ErrorMessage name="instructions" />
				<button type="button">Add Instruction</button>
			</InstructionsContainer>

			<div className="meals">
				<h4>Meal Categories</h4>
				<Input name={'meals'}>
					{({ field, form }: FieldProps) => (
						<CustomMultiSelect
							options={mealTypeOptions}
							handleChange={(val: ReactSelectOptions) =>
								form.setFieldValue('meals', val)
							}
							selectedValues={field.value}
						/>
					)}
				</Input>
				<ErrorMessage name="meals" />
			</div>

			<GenericInputContainer>
				<Input name={'isPublic'} type="checkbox" />
				<Label>Is Public?</Label>
			</GenericInputContainer>

			<button type="submit" disabled={isSubmitting}>
				Submit
			</button>
		</FormikForm>
	);
};

export const RecipeFormComponent = withFormik<RecipeFormProps, FormValues>({
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
		meals: [],
		isPublic: false,
	}),
	validationSchema: Yup.object().shape({
		name: Yup.string().required('Recipe name is required.'),
		description: Yup.string().required(
			'Please enter a short description about recipe.'
		),
		instructions: Yup.array().required('Instruction is required.'),
		ingredients: Yup.array().required('Ingredient is required.'),
		difficulty: Yup.string().required('Please select difficulty.'),
		meals: Yup.array().required('Please select at least 1 meal.'),
		yield: Yup.number()
			.required('Yield is required')
			.min(1, 'Yield is required.'),
	}),
	handleSubmit: async (values, { props, setSubmitting }) => {
		const formattedData = getFormattedRecipeData(values);
		try {
			await props.handleSubmit(formattedData);
			setSubmitting(false);
		} catch (error) {
			setSubmitting(false);
		}
	},
	displayName: 'RecipeForm',
})(RecipeForm);
