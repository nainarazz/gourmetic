import React from 'react';
import {
	InstructionsWrapper,
	Title,
	RowInstruction,
	InstructionDetail,
	StepNumber,
} from './instruction.style';

export const Instruction: React.SFC = () => (
	<React.Fragment>
		<InstructionsWrapper>
			<Title>Instructions</Title>
			<div>
				<RowInstruction>
					<StepNumber>1</StepNumber>
					<InstructionDetail>
						Preheat grill for medium heat and lightly oil the grate.
					</InstructionDetail>
				</RowInstruction>
				<RowInstruction>
					<StepNumber>2</StepNumber>
					<InstructionDetail>
						Roast red, yellow, and orange bell peppers on the
						preheated grill until blackened on all sides, about 15
						minutes. Turn peppers as they blacken. Transfer peppers
						to a large resealable plastic bag and close the bag; set
						peppers aside until cool. Strip off and discard the
						skins, remove stems and seeds, and dice the peppers.
					</InstructionDetail>
				</RowInstruction>
				<RowInstruction>
					<StepNumber>3</StepNumber>
					<InstructionDetail>
						Cook sausages on the grill until browned and no longer
						pink inside, about 8 minutes per side. An instant-read
						meat thermometer inserted into the center of a sausage
						should read at least 160 degrees F (70 degrees C).
					</InstructionDetail>
				</RowInstruction>
			</div>
		</InstructionsWrapper>
	</React.Fragment>
);
