import styled from 'styled-components';
import { themeColor } from 'src/shared/themes/colors';

interface StyledChipProps {
	isSelected: boolean;
}

export const StyledChip = styled.div`
	border-radius: 36px;
	border: 1px solid;
	text-align: center;
	margin: 5px;
	padding: 10px;
	font-size: 0.9rem;
	color: #fff;
	font-weight: ${props => (props.isSelected ? 600 : 'unset')};
	background-color: ${(props: StyledChipProps) =>
		props.isSelected ? themeColor.purple : '#D3D3D3'};
	:hover {
		cursor: pointer;
		background-color: ${props =>
			!props.isSelected ? themeColor.purple : ''};
		opacity: ${props => (!props.isSelected ? 0.5 : 1)};
	}

	@media (min-width: 360px) {
		min-width: 80px;
	}

	@media (min-width: 1024px) {
		min-width: 130px;
		width: 10%;
	}
`;
