import styled from 'styled-components';
import { themeColor } from '../themes/colors';

export const BaseButton = styled.button`
	padding: 0.25rem 0.5rem;
	font-size: 0.9rem;
	color: #fff;
	margin: 0 10px;
	border-radius: 8px;
	font-weight: 500;
	line-height: 1.5;
	outline: none;
	border: none;
	background-color: ${themeColor.secondary};

	:hover {
		cursor: pointer;
	}

	:disabled {
		opacity: 0.3;
	}
`;

export const PlusRoundButton = styled(BaseButton)`
	border-radius: 50%;
	padding: 0.2rem 0.4rem;
	line-height: initial;
	transform: translateY(85%);
	height: 30px;
	width: 30px;
	background-color: ${themeColor.purple};
`;

export const ButtonText = styled(BaseButton)`
	margin: 0;
	font-size: 0.8rem;
	border-radius: 5px;
	background-color: ${themeColor.purple};
`;

export const SubmitButton = styled(BaseButton)`
	margin: 0;
	background-color: ${themeColor.purple};
	min-width: 30%;
	width: 30%;
	border-radius: 5px;
`;

// To be used with font awesome clear icon. Font awesome icon will be the text in button tag
export const InputClearButton = styled.button`
	border: none;
	outline: none;
	background: transparent;
	:hover {
		cursor: pointer;
	}
`;
