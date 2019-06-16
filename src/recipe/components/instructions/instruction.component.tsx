import React from 'react';
import { Instructions } from '../../../graphql-generated-types/query-types';
import {
	InstructionsWrapper,
	Title,
	RowInstruction,
	InstructionDetail,
	StepNumber,
} from './instruction.style';

interface InstructionsProps {
	instructions: Instructions[];
}

export const Instruction: React.SFC<InstructionsProps> = props => (
	<React.Fragment>
		<InstructionsWrapper>
			<Title>Instructions</Title>
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
