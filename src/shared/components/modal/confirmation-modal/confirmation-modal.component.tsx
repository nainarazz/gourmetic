import React, { FunctionComponent } from 'react';
import { BaseModal } from '../base-modal';
import {
	ConfirmationButtons,
	Message,
	YesButton,
	NoButton,
	Wrapper,
} from './confirmation-modal.style';

interface ConfirmationModalProps {
	isShown: boolean;
	hide: () => void;
	onConfirm: () => void;
	onCancel: () => void;
}

export const ConfirmationModal: FunctionComponent<
	ConfirmationModalProps
> = props => {
	const content = (
		<React.Fragment>
			<Message>Are you sure you want to delete recipe?</Message>
			<ConfirmationButtons>
				<YesButton onClick={props.onConfirm}>Yes</YesButton>
				<NoButton onClick={props.onCancel}>No</NoButton>
			</ConfirmationButtons>
		</React.Fragment>
	);
	return (
		<React.Fragment>
			<BaseModal
				isShown={props.isShown}
				hide={props.hide}
				Wrapper={Wrapper}
				modalContent={content}
				headerText={'Confirmation'}
				headerColor={'red'}
			/>
		</React.Fragment>
	);
};
