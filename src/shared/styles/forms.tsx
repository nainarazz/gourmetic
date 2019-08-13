import styled from 'styled-components';
import { Field, Form } from 'formik';
import { themeColor } from '../themes/colors';

export const FormikForm = styled(Form)`
	display: flex;
	flex-direction: column;
	padding: 1rem;
`;

export const GenericInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 5px 0;
`;

export const Label = styled.label`
	margin-bottom: 5px;
`;

export const StyledFormikTextArea = styled(Field)`
	resize: none;
	line-height: 1.5;
	height: 3rem;
	border-radius: 5px;
	padding: 0 10px;
	border: 1px solid lightgrey;

	&:focus {
		border: 1px solid ${themeColor.mainBrand};
		outline: none;
	}
`;

export const StyledFormikInput = styled(Field)`
	border-radius: 5px;
	line-height: 2;
	padding: 0 10px;
	border: 1px solid lightgrey;

	&:focus {
		border: 1px solid ${themeColor.mainBrand};
		outline: none;
	}
`;
