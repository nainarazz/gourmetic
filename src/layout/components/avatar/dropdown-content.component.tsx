import Link from 'next/link';
import React, { SFC } from 'react';
import { DropdownContent, DropdownItem, UserInfo } from './dropdown.style';

interface DropdownContentProps {
	// tslint:disable-next-line:no-any
	user: any;
	logout: () => void;
}

export const Dropdown: SFC<DropdownContentProps> = props => {
	return (
		<React.Fragment>
			<DropdownContent>
				<UserInfo>
					<span>{props.user.name}</span>
				</UserInfo>
				<Link href={`/`}>
					<DropdownItem>
						<span>My Profile</span>
					</DropdownItem>
				</Link>
				<DropdownItem onClick={props.logout}>
					<span>Logout</span>
				</DropdownItem>
			</DropdownContent>
		</React.Fragment>
	);
};
