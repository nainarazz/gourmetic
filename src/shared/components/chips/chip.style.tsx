import styled from 'styled-components';
import { themeColor } from 'src/shared/themes/colors';

interface StyledChipProps {
	isSelected: boolean;
}

export const StyledChip = styled.div`
	border-radius: 10px;
	width: 12%;
	border: 1px solid;
	text-align: center;
	padding: 5px;
	font-size: 0.8rem;
	background-color: ${(props: StyledChipProps) =>
		props.isSelected ? themeColor.purple : ''};
`;
