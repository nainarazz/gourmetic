import Scrollbar from 'react-scrollbars-custom';
import styled from 'styled-components';

export const FilterWrapper = styled.div`
	display: flex;
	margin-bottom: 15px;
	margin: 0 6%;
`;

export const ArrowIcon = styled.div`
	align-self: center;
	:hover {
		cursor: pointer;
	}
`;

export const ChipsContainer = styled(Scrollbar)`
	margin: 0 25px;
	height: 30px !important;
	padding: 5px;
	padding-bottom: 20px;
`;

export const ChipContent = styled.div`
	display: flex;
	width: 90%;
	justify-content: space-between;
`;
