import Avatar from 'react-avatar';
import styled from 'styled-components';

interface StyleProps {
	isOpen?: boolean;
}

export const Container = styled.div`
	height: 100vh;
	background: #fff;
	box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	width: 70%;
	max-width: 400px;
	z-index: 500;
	transform: ${(props: StyleProps) =>
		props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
	transition: transform 0.3s ease-out;
`;

export const SideDrawerLogo = styled.div`
	background: #5cb818;
	height: 30%;
	position: relative;
`;

export const StyledAvatar = styled(Avatar)`
	position: absolute;
	bottom: -5px;
	left: 5px;
`;

export const SideDrawerItem = styled.div`
	padding: 1rem 2.5rem;
	font-size: 0.9rem;
	span {
		margin: 0 1rem;
	}
	:hover {
		background-color: #5cb818;
		color: #fff;
		cursor: pointer;
	}
`;
