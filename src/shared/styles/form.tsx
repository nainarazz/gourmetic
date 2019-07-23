import styled from 'styled-components';
import { Field, Form } from 'formik';

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

export const Input = styled(Field)``;
