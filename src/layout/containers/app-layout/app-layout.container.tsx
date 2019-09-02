import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import { Backdrop } from '../../../shared/components/backdrop/backdrop.component';
import { createGlobalStyle } from 'styled-components';
import { Header } from '../../components/header/header.component';
import { MainContainer } from '../../components/main/main.component';
import { PlusButton } from './app-layout.style';
import { SideDrawer } from '../../components/side-drawer/side-drawer.component';
import { ToastContainer } from 'react-toastify';
import { useAuth0 } from 'src/authentication/react-auth0-wrapper';
import { useRouter } from 'next/router';
import './toast-container.css';
import 'react-toastify/dist/ReactToastify.min.css';

const GlobalStyle = createGlobalStyle`
    body {
		margin: 0;
		background-color: #FAFAFA;
		font-family: 'Roboto', sans-serif;
    }
`;

const urlAtHomePage = (routeUrl: string) => /^\/$/.test(routeUrl);

export const AppLayout: React.SFC = props => {
	const [sideDrawerIsOpen, setSideDrawerIsOpen] = useState(false);
	let backdrop: JSX.Element | null = null;

	// tslint:disable-next-line:no-any
	const { loading }: any = useAuth0();
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

	const pageContents = (
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
			<MainContainer>{props.children}</MainContainer>
			{newRecipeButton}
			<ToastContainer hideProgressBar toastClassName="toast-container" />
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<Head>
				<title>Gourmetic</title>
			</Head>
			<GlobalStyle />
			{loading ? <span>loading...</span> : pageContents}
		</React.Fragment>
	);
};
