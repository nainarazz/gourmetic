import styled from 'styled-components';
import { themeColor } from 'src/shared/themes/colors';

interface ModalHeaderProps {
	headerText?: string;
	headerColor?: string;
}

export const ModalWrapper = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 700;
	width: auto;
	outline: 0;
`;

export const StyledModal = styled.div`
	z-index: 100;
	background: white;
	position: relative;
	margin: auto;
	border-radius: 8px;
`;

export const ModalHeader = styled.div`
	border-radius: 8px 8px 0 0;
	display: flex;
	justify-content: space-between;
	padding: 0.3rem;
	background: ${(prop: ModalHeaderProps) =>
		prop.headerColor ? prop.headerColor : themeColor.mainBrand};
`;

export const HeaderText = styled.div`
	color: #fff;
	align-self: center;
`;

export const ModalCloseButton = styled.button`
	font-size: 0.8rem;
	border: none;
	border-radius: 3px;
	margin-left: 0.5rem;
	background: none;

	:hover {
		cursor: pointer;
	}
`;

export const ModalContentWrapper = styled.div`
	padding: 10px;
	max-height: 30rem;
	overflow-x: hidden;
	overflow-y: auto;
`;
