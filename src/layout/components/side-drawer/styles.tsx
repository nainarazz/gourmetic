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
	z-index: 200;
	transform: ${(props: StyleProps) =>
		props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
	transition: transform 0.3s ease-out;
`;
