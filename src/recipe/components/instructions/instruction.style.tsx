import styled from 'styled-components';
import { themeColor } from '../../../shared/themes/colors';

export const InstructionsWrapper = styled.div`
	width: 90%;
	margin: auto;
	padding-bottom: 40px;
`;

export const Title = styled.div`
	font-size: 1rem;
	font-weight: 500;
`;

export const RowInstruction = styled.div`
	display: flex;
	margin: 15px 0;
`;

export const InstructionDetail = styled.div`
	font-size: 0.9rem;
	width: 90%;
	line-height: 1.5rem;
`;

export const StepNumber = styled.div`
	width: 27px;
	height: 25px;
	line-height: 2;
	background: ${themeColor.secondary};
	color: #fff;
	border-radius: 50%;
	text-align: center;
	margin-right: 10px;
	font-size: 0.8rem;
`;

export const StyledInstruction = styled.div`
	display: flex;
`;
