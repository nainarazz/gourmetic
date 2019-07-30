import React, { ChangeEvent, SFC, useState } from 'react';
import { emptyInstruction } from '../../constants/recipe.constants';
import { FieldArrayRenderProps } from 'formik';
import { FormValues, Instruction } from '../../types/recipe.interface';
import { GenericInputContainer, Input } from '../../../shared/styles/form';
import { StyledInstruction } from '../recipe-form/recipe-form.style';

interface IngredientListProps {
	formValues: FormValues;
	arrayHelpers: FieldArrayRenderProps;
}

export const InstructionListForm: SFC<IngredientListProps> = ({
	formValues,
	arrayHelpers,
}) => {
	const instructions = formValues.instructions;
	const [instruction, setInstruction] = useState(emptyInstruction);
	const [stepNumber, setStepNumber] = useState(1);

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const name = event.target.name;
		const value = event.target.value;

		const modifiedInstruction: Instruction = {
			...instruction,
			[name]: value,
		};
		setInstruction(modifiedInstruction);
	};

	return (
		<React.Fragment>
			{instructions.map((ins, i) => {
				return (
					<div key={i}>
						<span>{i + 1}</span>
						<span>{ins.description}</span>
						<button
							type="button"
							onClick={() => {
								arrayHelpers.remove(i);
							}}
						>
							remove instruction
						</button>
					</div>
				);
			})}
			<StyledInstruction>
				<GenericInputContainer>
					<textarea
						name="description"
						value={instruction.description}
						onChange={handleChange}
					/>
				</GenericInputContainer>
				<button
					type="button"
					onClick={() => {
						arrayHelpers.push(instruction);
						setInstruction(emptyInstruction);
					}}
				>
					add instruction
				</button>
			</StyledInstruction>
		</React.Fragment>
	);
};
