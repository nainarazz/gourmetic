import React from 'react';
import { Backdrop as BackdropComponent } from './styles';

export const Backdrop = props => (
	<React.Fragment>
		<div onClick={props.click}>
			<BackdropComponent />
		</div>
	</React.Fragment>
);
