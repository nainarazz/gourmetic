import React, { FunctionComponent } from 'react';
import { toast } from 'react-toastify';

interface ErrorToastProps {
	message: string;
}

export const ErrorToast: FunctionComponent<ErrorToastProps> = props => {
	return (
		<React.Fragment>
			{toast.error(props.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
			})}
		</React.Fragment>
	);
};
