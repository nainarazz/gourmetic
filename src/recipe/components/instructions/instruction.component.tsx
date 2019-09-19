import React from 'react';
import { Instruction as IInstruction } from '../../types/recipe.interface';
import {
	InstructionsWrapper,
	Title,
	RowInstruction,
	InstructionDetail,
	StepNumber,
} from './instruction.style';

interface InstructionsProps {
	instructions: IInstruction[];
}

export const Instruction: React.SFC<InstructionsProps> = props => (
	<React.Fragment>
		<InstructionsWrapper>
			<Title>INSTRUCTIONS</Title>
			{props.instructions.map((instruction, index) => (
				<RowInstruction key={index}>
					<StepNumber>{instruction.stepNumber}</StepNumber>
					<InstructionDetail>
						{instruction.description}
					</InstructionDetail>
				</RowInstruction>
			))}
		</InstructionsWrapper>
	</React.Fragment>
);
