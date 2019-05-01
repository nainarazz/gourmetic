import React, { FunctionComponent, useState } from 'react';
import { Backdrop } from '../../../shared/components/backdrop/backdrop';
import { createGlobalStyle } from 'styled-components';
import { Header } from '../../components/header/header';
import { SideDrawer } from '../../components/side-drawer/side-drawer';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
    }
`;

export const AppLayout: FunctionComponent = props => {
	const [sideDrawerIsOpen, setSideDrawerIsOpen] = useState(false);
	let backdrop: JSX.Element | null = null;

	if (sideDrawerIsOpen) {
		backdrop = <Backdrop click={() => setSideDrawerIsOpen(false)} />;
	}

	return (
		<div>
			<GlobalStyle />
			<Header
				drawerClickHandler={() =>
					setSideDrawerIsOpen(!sideDrawerIsOpen)
				}
			/>
			{backdrop}
			<SideDrawer isOpen={sideDrawerIsOpen} />
			{props.children}
		</div>
	);
};
