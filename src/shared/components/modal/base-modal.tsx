import React, { FunctionComponent, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Backdrop } from '../backdrop/backdrop.component';
import { faWindowClose as closeButtonIcon } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	ModalWrapper,
	StyledModal,
	ModalHeader,
	ModalContentWrapper,
	ModalCloseButton,
	HeaderText,
} from './base-modal.style';

export interface ModalProps {
	isShown: boolean;
	hide: () => void;
	Wrapper: React.ComponentType;
	modalContent: JSX.Element;
	headerColor?: string;
	headerTextColor?: string;
	headerText?: string;
	closeButtonColor?: string;
}

export const BaseModal: FunctionComponent<ModalProps> = ({
	isShown,
	hide,
	Wrapper,
	modalContent,
	headerText,
	headerTextColor,
	headerColor,
	closeButtonColor,
}) => {
	// tslint:disable-next-line:no-any
	const onKeyDown = (event: any) => {
		if (event.keyCode === 27 && isShown) {
			hide();
		}
	};

	useEffect(() => {
		isShown
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'unset');
		document.addEventListener('keydown', onKeyDown, false);
		return () => {
			document.removeEventListener('keydown', onKeyDown, false);
		};
	}, [isShown]);

	const modal = (
		<React.Fragment>
			<Backdrop click={hide} />
			{/* this wrapper component is needed to allow user to create a modal of different sizes */}
			<Wrapper>
				<ModalWrapper
					aria-modal
					aria-hidden
					tabIndex={-1}
					role="dialog"
				>
					<StyledModal>
						<ModalHeader headerColor={headerColor}>
							<div></div>
							<HeaderText headerTextColor={headerTextColor}>
								{headerText}
							</HeaderText>
							<ModalCloseButton
								type="button"
								data-dismiss="modal"
								aria-label="Close"
								onClick={hide}
							>
								<FontAwesomeIcon
									icon={closeButtonIcon}
									size={'2x'}
									color={closeButtonColor || '#fff'}
								/>
							</ModalCloseButton>
						</ModalHeader>
						<ModalContentWrapper>
							{modalContent}
						</ModalContentWrapper>
					</StyledModal>
				</ModalWrapper>
			</Wrapper>
		</React.Fragment>
	);

	return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
