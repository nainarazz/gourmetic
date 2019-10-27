import React, { FunctionComponent } from 'react';
import { StyledChip } from './chip.style';

interface ChipProps {
	label: string;
	isSelected: boolean;
	onSelectChip: () => void;
}

export const Chip: FunctionComponent<ChipProps> = props => {
	return (
		<StyledChip isSelected={props.isSelected} onClick={props.onSelectChip}>
			{props.label}
		</StyledChip>
	);
};
