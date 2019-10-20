import Avatar from 'react-avatar';
import React, {
	SFC,
	useEffect,
	useRef,
	useState
	} from 'react';
import { AvatarWrapper } from './dropdown.style';
import { Dropdown } from './dropdown-content.component';
import { useAuth0 } from 'src/authentication/react-auth0-wrapper';

interface AvatarProps {
	userName: string;
	pictureUrl: string;
}

export const AvatarWithDropdown: SFC<AvatarProps> = props => {
	const [showDropdown, setShowDropdown] = useState(false);
	// tslint:disable-next-line:no-any
	const { user, logout }: any = useAuth0();
	const refElement = useRef<HTMLInputElement>(null);

	// tslint:disable-next-line:no-any
	const toggleDropdown = () => setShowDropdown(!showDropdown);

	// tslint:disable-next-line:no-any
	const handleClickOutside = (event: any) => {
		if (refElement.current && !refElement.current.contains(event.target)) {
			setShowDropdown(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<React.Fragment>
			<AvatarWrapper onClick={toggleDropdown} ref={refElement}>
				<Avatar
					src={props.pictureUrl}
					name={props.userName}
					round
					size="40"
				/>
				{showDropdown && <Dropdown user={user} logout={logout} />}
			</AvatarWrapper>
		</React.Fragment>
	);
};
