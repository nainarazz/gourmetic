import * as Yup from 'yup';
import React from 'react';
import { getRecipeFormValues } from './recipe-form.helper';
import { IngredientListForm } from '../ingredients/ingredient-list-form.component';
import { InstructionListForm } from '../instructions/instruction-list-form.component';
import { PhotoInput } from '../../../shared/components/photo-input/photo-input.component';
import { SubmitButton } from '../../../shared/styles/buttons';
import { toast } from 'react-toastify';
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
	recipe?: Recipe;
	handleSubmit: (recipe: FormValues) => Promise<void>;
}

const FILE_IMAGE_SIZE_LIMIT = 10000000;

const RecipeForm = (props: FormikProps<FormValues>) => {
	const { values, isSubmitting, errors, touched, setFieldValue } = props;

	// tslint:disable-next-line:no-any
	const handleImageInputChange = (e: any) =>
		setFieldValue('image', e.currentTarget.files[0]);

	const handleClearImage = () => setFieldValue('image', '');

	return (
		<FormikForm>
			<div>
				<PhotoInput
					value={values.image}
					handleClearImage={handleClearImage}
					handleImageInputChange={handleImageInputChange}
				/>
				{errors.image && touched.image && <span>{errors.image}</span>}
			</div>
			<GenericInputContainer>
				<Label htmlFor="recipe-name">
					Name<span className="required">*</span>
				</Label>
				<StyledFormikInput
					id="recipe-name"
					error={errors.name && touched.name ? 'true' : ''}
					name={'name'}
				/>
				<FormikErrorWrapper>
					<ErrorMessage name="name" />
				</FormikErrorWrapper>
			</GenericInputContainer>

			<GenericInputContainer>
				<Label htmlFor="recipe-description">
					Description<span className="required">*</span>
				</Label>
				<StyledFormikTextArea
					id="recipe-description"
					component="textarea"
					error={
						errors.recipeDescription && touched.recipeDescription
							? 'true'
							: ''
					}
					name={'recipeDescription'}
				/>
				<FormikErrorWrapper>
					<ErrorMessage name="recipeDescription" />
				</FormikErrorWrapper>
			</GenericInputContainer>

			<GenericInputContainer>
				<Label htmlFor="prep-time">Prep Time (minutes)</Label>
				<StyledFormikInput
					id="prep-time"
					name={'prepTime'}
					type="number"
					min="0"
				/>
			</GenericInputContainer>

			<GenericInputContainer>
				<Label htmlFor="cooking-time">Cooking Time (minutes)</Label>
				<StyledFormikInput
					id="cooking-time"
					name={'cookingTime'}
					type="number"
					min="0"
				/>
			</GenericInputContainer>

			<GenericInputContainer>
				<Label htmlFor="difficulty">
					Difficulty<span className="required">*</span>
				</Label>
				<StyledFormikInput id="difficulty" name={'difficulty'}>
					{({ field, form }: FieldProps) => (
						<CustomSelect
							options={recipeDifficulties}
							handleChange={val =>
								form.setFieldValue('difficulty', val)
							}
							selectedValue={field.value}
							error={
								errors.difficulty && touched.difficulty
									? 'true'
									: ''
							}
						/>
					)}
				</StyledFormikInput>
				<FormikErrorWrapper>
					<ErrorMessage name="difficulty" />
				</FormikErrorWrapper>
			</GenericInputContainer>

			<GenericInputContainer>
				<Label htmlFor="yield">
					Yield<span className="required">*</span>
				</Label>
				<StyledFormikInput
					id="yield"
					error={errors.yield && touched.yield ? 'true' : ''}
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
							error={
								errors.meals &&
								!!errors.meals.length &&
								touched.meals
									? 'true'
									: ''
							}
						/>
					)}
				</StyledFormikInput>
				<FormikErrorWrapper>
					<ErrorMessage name="meals" />
				</FormikErrorWrapper>
			</GenericInputContainer>

			<GenericInputContainer style={{ flexDirection: 'row' }}>
				<StyledFormikInput
					id="privacy"
					name={'isPublic'}
					checked={values.isPublic}
					type="checkbox"
				/>
				<Label htmlFor="privacy">Is Public?</Label>
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
	mapPropsToValues: props => getRecipeFormValues(props.recipe),
	enableReinitialize: true,
	validationSchema: Yup.object().shape({
		image: Yup.mixed().test(
			'fileSize',
			'File too large',
			value => (value && value.size <= FILE_IMAGE_SIZE_LIMIT) || true
		),
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
	handleSubmit: async (
		values,
		{ props, setSubmitting, resetForm, setFieldValue }
	) => {
		try {
			await props.handleSubmit(values);
			setSubmitting(false);
			toast.success('🚀 Successfully saved recipe!', {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
			resetForm();
		} catch (error) {
			toast.error('Failed to save recipe.', {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
			setSubmitting(false);
		}
	},
	displayName: 'RecipeForm',
})(RecipeForm);
