import React from 'react';
import { Container } from './styles';

interface SideDrawerProps {
	isOpen: boolean;
}

export const SideDrawer: React.SFC<SideDrawerProps> = props => (
	<React.Fragment>
		<Container isOpen={props.isOpen} />
	</React.Fragment>
);
