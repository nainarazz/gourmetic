import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { Backdrop } from '../../../shared/components/backdrop/backdrop.component';
import { faPlus as plusIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Header } from '../../components/header/header.component';
import { Main, PlusButton } from './app-layout.style';
import { SideDrawer } from '../../components/side-drawer/side-drawer.component';
import { Spinner } from 'src/shared/components/spinner/spinner.component';
import { ToastContainer } from 'react-toastify';
import { useAuth0 } from '../../../authentication/react-auth0-wrapper';
import './toast-container.css';
import 'react-toastify/dist/ReactToastify.min.css';

const urlAtHomePage = (routeUrl: string) => /^\/$/.test(routeUrl);

export const AppLayout: React.SFC = props => {
	const [sideDrawerIsOpen, setSideDrawerIsOpen] = useState(false);
	// tslint:disable:no-any
	const {
		checkingAuthentication,
		isAuthenticated,
		loginWithRedirect,
	}: any = useAuth0();
	let backdrop: JSX.Element | null = null;

	const toggleSideDrawer = () => {
		setSideDrawerIsOpen(!sideDrawerIsOpen);
	};

	const userRouter = useRouter();
	const newRecipeButton = urlAtHomePage(
		userRouter && userRouter.pathname
	) && (
		<PlusButton
			onClick={() =>
				isAuthenticated
					? Router.push('/recipe-form')
					: loginWithRedirect()
			}
		>
			<FontAwesomeIcon icon={plusIcon} size="1x" />
		</PlusButton>
	);

	if (sideDrawerIsOpen) {
		backdrop = <Backdrop click={() => setSideDrawerIsOpen(false)} />;
	}

	return checkingAuthentication ? (
		<Spinner />
	) : (
		<React.Fragment>
			<Header
				drawerClickHandler={() =>
					setSideDrawerIsOpen(!sideDrawerIsOpen)
				}
			/>
			{backdrop}
			<SideDrawer
				isOpen={sideDrawerIsOpen}
				toggleSideDrawer={toggleSideDrawer}
			/>

			<Main>{props.children}</Main>

			{newRecipeButton}
			<ToastContainer hideProgressBar toastClassName="toast-container" />
		</React.Fragment>
	);
};
