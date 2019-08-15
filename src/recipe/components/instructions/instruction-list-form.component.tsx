import React, { ChangeEvent, SFC, useState } from 'react';
import { ButtonText, InputClearButton } from '../../../shared/styles/buttons';
import { emptyInstruction } from '../../constants/recipe.constants';
import { faTimesCircle as clearButton } from '@fortawesome/free-solid-svg-icons';
import { FieldArrayRenderProps } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormValues, Instruction } from '../../types/recipe.interface';
import { ItemIndex } from '../ingredients/ingredient.style';
import { StyledInstruction } from './instruction.style';
import {
	GenericInputContainer,
	StyledFormikTextArea,
} from '../../../shared/styles/forms';

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

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const name = event.target.name;
		const value = event.target.value;

		const modifiedInstruction: Instruction = {
			...instruction,
			[name]: value,
		};
		setInstruction(modifiedInstruction);
	};

	const addInstruction = () => {
		if (instruction.description) {
			arrayHelpers.push(instruction);
			setInstruction(emptyInstruction);
		}
	};

	return (
		<React.Fragment>
			{instructions.map((ins, i) => {
				return (
					<div key={i}>
						<ItemIndex>{i + 1}</ItemIndex> -{' '}
						<span>{ins.description}</span>
						<InputClearButton
							type="button"
							onClick={() => {
								arrayHelpers.remove(i);
							}}
						>
							<FontAwesomeIcon icon={clearButton} color="red" />
						</InputClearButton>
					</div>
				);
			})}
			<StyledInstruction>
				<GenericInputContainer style={{ width: '100%' }}>
					<StyledFormikTextArea
						name="description"
						component="textarea"
						value={instruction.description}
						onChange={handleChange}
					/>
				</GenericInputContainer>
			</StyledInstruction>
			<ButtonText
				type="button"
				onClick={() => addInstruction()}
				disabled={!instruction.description}
			>
				Add
			</ButtonText>
		</React.Fragment>
	);
};
