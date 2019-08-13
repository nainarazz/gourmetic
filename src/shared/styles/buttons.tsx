import styled from 'styled-components';
import { themeColor } from '../themes/colors';

export const BaseButton = styled.button`
	padding: 0.25rem 0.5rem;
	font-size: 1rem;
	color: #fff;
	margin: 0 10px;
	border-radius: 8px;
	font-weight: 500;
	line-height: 1.5;
	outline: none;
	border: none;
	background-color: ${themeColor.darkAccent};

	:hover {
		cursor: pointer;
	}
`;
