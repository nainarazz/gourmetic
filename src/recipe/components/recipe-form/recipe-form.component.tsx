import * as Yup from 'yup';
import React from 'react';
import { getFormattedRecipeData } from './recipe-form.utils';
import { IngredientListForm } from '../ingredients/ingredient-list-form.component';
import { InstructionListForm } from '../instructions/instruction-list-form.component';
import { SubmitButton } from '../../../shared/styles/buttons';
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
	Privacy,
} from './recipe-form.style';
import {
	FormikForm,
	GenericInputContainer,
	Label,
	StyledFormikInput,
	StyledFormikTextArea,
	FormikErrorWrapper,
} from '../../../shared/styles/forms';

interface RecipeFormProps {
	handleSubmit: (recipe: Partial<Recipe>) => Promise<void>;
}

const RecipeForm = (props: FormikProps<FormValues>) => {
	const { values, isSubmitting, errors, touched } = props;

	return (
		<FormikForm>
			<div className="image">
				<StyledFormikInput type="file" name={'image'} />
			</div>
			<GenericInputContainer>
				<Label>
					Name<span className="required">*</span>
				</Label>
				<StyledFormikInput
					error={(errors.name && touched.name) as boolean}
					name={'name'}
				/>
				<FormikErrorWrapper>
					<ErrorMessage name="name" />
				</FormikErrorWrapper>
			</GenericInputContainer>

			<GenericInputContainer>
				<Label>
					Description<span className="required">*</span>
				</Label>
				<StyledFormikTextArea
					component="textarea"
					error={
						(errors.recipeDescription &&
							touched.recipeDescription) as boolean
					}
					name={'recipeDescription'}
				/>
				<FormikErrorWrapper>
					<ErrorMessage name="recipeDescription" />
				</FormikErrorWrapper>
			</GenericInputContainer>

			<GenericInputContainer>
				<Label>Prep Time (minutes)</Label>
				<StyledFormikInput name={'prepTime'} type="number" min="0" />
			</GenericInputContainer>

			<GenericInputContainer>
				<Label>Cooking Time (minutes)</Label>
				<StyledFormikInput name={'cookingTime'} type="number" min="0" />
			</GenericInputContainer>

			<GenericInputContainer>
				<Label>
					Difficulty<span className="required">*</span>
				</Label>
				<StyledFormikInput name={'difficulty'}>
					{({ field, form }: FieldProps) => (
						<CustomSelect
							options={recipeDifficulties}
							handleChange={val =>
								form.setFieldValue('difficulty', val.value)
							}
							selectedValue={field.value}
							hasError={
								(errors.difficulty &&
									touched.difficulty) as boolean
							}
						/>
					)}
				</StyledFormikInput>
				<FormikErrorWrapper>
					<ErrorMessage name="difficulty" />
				</FormikErrorWrapper>
			</GenericInputContainer>

			<GenericInputContainer>
				<Label>
					Yield<span className="required">*</span>
				</Label>
				<StyledFormikInput
					error={(errors.yield && touched.yield) as boolean}
					name={'yield'}
					type="number"
					min="0"
				/>
				<FormikErrorWrapper>
					<ErrorMessage name="yield" />
				</FormikErrorWrapper>
			</GenericInputContainer>

			<IngredientsContainer>
				<Label>
					Ingredients<span className="required">*</span>
				</Label>
				<FieldArray
					name={'ingredients'}
					render={arrayHelpers => (
						<IngredientListForm
							formValues={values}
							arrayHelpers={arrayHelpers}
						/>
					)}
				/>
				<FormikErrorWrapper>
					<ErrorMessage name="ingredients" />
				</FormikErrorWrapper>
			</IngredientsContainer>

			<InstructionsContainer>
				<Label>
					Instructions<span className="required">*</span>
				</Label>
				<FieldArray
					name={'instructions'}
					render={arrayHelpers => (
						<InstructionListForm
							formValues={values}
							arrayHelpers={arrayHelpers}
						/>
					)}
				/>
				<FormikErrorWrapper>
					<ErrorMessage name="instructions" />
				</FormikErrorWrapper>
			</InstructionsContainer>

			<GenericInputContainer>
				<Label>
					Meal Categories<span className="required">*</span>
				</Label>
				<StyledFormikInput name={'meals'}>
					{({ field, form }: FieldProps) => (
						<CustomMultiSelect
							options={mealTypeOptions}
							handleChange={(val: ReactSelectOptions) =>
								form.setFieldValue('meals', val)
							}
							selectedValues={field.value}
							hasError={
								(errors.meals &&
									!!errors.meals.length &&
									touched.meals) as boolean
							}
						/>
					)}
				</StyledFormikInput>
				<FormikErrorWrapper>
					<ErrorMessage name="meals" />
				</FormikErrorWrapper>
			</GenericInputContainer>

			<GenericInputContainer style={{ flexDirection: 'row' }}>
				<StyledFormikInput name={'isPublic'} type="checkbox" />
				<Label>Is Public?</Label>
			</GenericInputContainer>

			<Privacy>
				<i>
					By default your recipe can only be viewed by you. If you
					want to make it public, please send an email to
					gourmetic@gmail.com.
				</i>
			</Privacy>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<SubmitButton type="submit" disabled={isSubmitting}>
					Submit
				</SubmitButton>
			</div>
		</FormikForm>
	);
};

export const RecipeFormComponent = withFormik<RecipeFormProps, FormValues>({
	mapPropsToValues: () => ({
		name: '',
		recipeDescription: '',
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
		recipeDescription: Yup.string().required(
			'Please enter a short description about recipe.'
		),
		instructions: Yup.array().required('Instruction is required.'),
		ingredients: Yup.array().required('Ingredient is required.'),
		difficulty: Yup.string().required('Please select difficulty.'),
		meals: Yup.array()
			.nullable()
			.required('Please select at least 1 meal.'),
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
