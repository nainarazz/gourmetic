import styled from 'styled-components';
import { BaseButton } from 'src/shared/styles/buttons';
import { borderColor, modalColor } from 'src/shared/themes/colors';

export const Wrapper = styled.div`
    width 80%;

    @media(min-width: 768px) {
    width: 60%;
    }

    @media(min-width: 1024px) {
    width: 40%;
    }
`;

export const ConfirmationButtons = styled.div`
	display: flex;
	justify-content: center;
`;

export const Message = styled.div`
	font-size: 0.9rem;
	margin-bottom: 10px;
	text-align: center;
`;

export const YesButton = styled(BaseButton)`
	width: 6rem;
	background-color: ${modalColor.warning};
	:hover {
		background-color: red;
	}
`;

export const NoButton = styled(BaseButton)`
	width: 3rem;
	background-color: ${borderColor.lightgrey};
	:hover {
		background-color: grey;
	}
`;
