import styled from 'styled-components';
import { borderColor, errorColor, themeColor } from '../themes/colors';
import { Field, Form } from 'formik';

interface FormikInputProps {
	error?: string;
	fieldName?: string;
}

export const FormikForm = styled(Form)`
	display: flex;
	flex-direction: column;
	padding: 1rem;
`;

export const GenericInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 10px 0;
`;

export const Label = styled.label`
	margin-bottom: 5px;
	font-size: 0.9rem;
	font-weight: 500;
	span.required {
		color: ${errorColor.message};
	}
`;

export const StyledFormikInput = styled(Field)`
	border-radius: 5px;
	line-height: 2;
	padding: 0 10px;
	border: 1px solid ${borderColor.lightgrey};

	background: ${(props: FormikInputProps) =>
		props.error ? errorColor.background : 'initial'};
	border-color: ${(props: FormikInputProps) =>
		props.error ? errorColor.border : borderColor.lightgrey};

	&:focus {
		border: 1px solid
			${(props: FormikInputProps) =>
				props.error ? errorColor.border : themeColor.mainBrand};
		outline: none;
	}
`;

export const StyledFormikTextArea = styled(StyledFormikInput)`
	resize: none;
	height: 3rem;
	margin-top: 0.9rem;
`;

export const FormikErrorWrapper = styled.div`
	font-size: 0.8rem;
	color: ${errorColor.message};
	margin: 5px 0;
`;
