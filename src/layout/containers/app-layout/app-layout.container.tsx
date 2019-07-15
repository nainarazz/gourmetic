import Head from 'next/head';
import React, { useState } from 'react';
import { Backdrop } from '../../../shared/components/backdrop/backdrop.component';
import { createGlobalStyle } from 'styled-components';
import { Header } from '../../components/header/header.component';
import { MainContainer } from '../../components/main/main.component';
import { PlusButton } from './app-layout.style';
import { SideDrawer } from '../../components/side-drawer/side-drawer.component';

const GlobalStyle = createGlobalStyle`
    body {
		margin: 0;
		background-color: #FAFAFA;
    }
`;

export const AppLayout: React.SFC = props => {
	const [sideDrawerIsOpen, setSideDrawerIsOpen] = useState(false);
	let backdrop: JSX.Element | null = null;

	if (sideDrawerIsOpen) {
		backdrop = <Backdrop click={() => setSideDrawerIsOpen(false)} />;
	}

	return (
		<div>
			<Head>
				<title>Gourmetic</title>
			</Head>
			<GlobalStyle />
			<Header
				drawerClickHandler={() =>
					setSideDrawerIsOpen(!sideDrawerIsOpen)
				}
			/>
			{backdrop}
			<SideDrawer isOpen={sideDrawerIsOpen} />
			<MainContainer>{props.children}</MainContainer>
			<PlusButton>+</PlusButton>
		</div>
	);
};
