import styled from 'styled-components';

interface HeaderStyleProps {
	showLogo: boolean;
}

export const Container = styled.div`
	position: fixed;
	z-index: 400;
	background-color: #5cb818;
	width: 100%;
	padding: 1rem;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const HeaderItems = styled.div`
	width: 90%;
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin: auto;
`;

export const ButtonsContainer = styled.div`
	display: none;

	@media (min-width: 1020px) {
		display: flex;
	}
`;

export const Button = styled.div`
	padding: 0.25rem 0.5rem;
	font-size: 1.09375rem;
	background-color: #008000;
	color: #fff;
	margin: 0 10px;
	border-radius: 8px;
	font-weight: 500;
	line-height: 1.5;

	:hover {
		cursor: pointer;
	}
`;

export const Logo = styled.div`
	font-size: 2rem;
	color: #fff;
	flex-grow: 1;
	display: ${(prop: HeaderStyleProps) => (prop.showLogo ? '' : 'none')};

	:hover {
		cursor: pointer;
	}
`;

export const DrawerToggleButton = styled.button`
	font-size: 1.5rem;
	color: #fff;
	background: none;
	border: none;
	outline: none;

	:hover {
		cursor: pointer;
	}

	@media (min-width: 1020px) {
		display: none;
	}
`;
