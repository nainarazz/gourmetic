import React, { FunctionComponent } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Header } from '../header/header';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
    }
`;

export const AppLayout: FunctionComponent = props => {
	return (
		<div>
			<GlobalStyle />
			<Header />
			{props.children}
		</div>
	);
};
