import React from 'react';
import { Backdrop as BackdropComponent } from './backdrop.style';

interface BackdropProps {
	click(): void;
}

export const Backdrop: React.SFC<BackdropProps> = props => (
	<React.Fragment>
		<div onClick={props.click}>
			<BackdropComponent />
		</div>
	</React.Fragment>
);
