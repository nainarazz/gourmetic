import React, { Component } from 'react';
import { toast } from 'react-toastify';

interface ErrorBoundaryState {
	error: boolean;
	// tslint:disable-next-line:no-any
	info: any;
}
export class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
	// tslint:disable-next-line:no-any
	constructor(props: any) {
		super(props);
		// Add some default error states
		this.state = {
			error: false,
			info: null,
		};
	}

	// tslint:disable:no-any
	componentDidCatch(error: any, info: any) {
		this.setState({
			error,
			info,
		});
	}

	render() {
		if (this.state.error) {
			return (
				<React.Fragment>
					{this.props.children}
					{toast.error(
						`An unexpected error occured. Admin has been notified. ${this.state.info.componentStack}`,
						{
							position: toast.POSITION.BOTTOM_RIGHT,
						}
					)}
				</React.Fragment>
			);
		}
		return this.props.children;
	}
}
