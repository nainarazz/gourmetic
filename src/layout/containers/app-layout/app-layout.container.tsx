import Link from 'next/link';
import React, { useState } from 'react';
import { Backdrop } from '../../../shared/components/backdrop/backdrop.component';
import { Header } from '../../components/header/header.component';
import { Main, PlusButton } from './app-layout.style';
import { SideDrawer } from '../../components/side-drawer/side-drawer.component';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import './toast-container.css';
import 'react-toastify/dist/ReactToastify.min.css';

const urlAtHomePage = (routeUrl: string) => /^\/$/.test(routeUrl);

export const AppLayout: React.SFC = props => {
	const [sideDrawerIsOpen, setSideDrawerIsOpen] = useState(false);
	let backdrop: JSX.Element | null = null;

	const toggleSideDrawer = () => {
		setSideDrawerIsOpen(!sideDrawerIsOpen);
	};

	const userRouter = useRouter();
	const newRecipeButton = urlAtHomePage(
		userRouter && userRouter.pathname
	) && (
		<Link href={`/new-recipe`} as={`new-recipe`}>
			<PlusButton>+</PlusButton>
		</Link>
	);

	if (sideDrawerIsOpen) {
		backdrop = <Backdrop click={() => setSideDrawerIsOpen(false)} />;
	}

	return (
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
