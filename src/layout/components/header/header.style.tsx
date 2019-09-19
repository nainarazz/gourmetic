import styled from 'styled-components';
import { BaseButton } from '../../../shared/styles/buttons';
import { themeColor } from '../../../shared/themes/colors';

interface HeaderStyleProps {
	showLogo: boolean;
}

export const Container = styled.div`
	position: fixed;
	z-index: 400;
	background-color: ${themeColor.mainBrand};
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

export const HeaderButton = styled(BaseButton)`
	display: none;
	padding: 0.45rem 1rem;
	border-radius: 36px;
	font-weight: 800;
	font-size: 0.75rem;

	@media (min-width: 1020px) {
		display: flex;
	}
`;

export const AvatarButton = styled.div`
	display: none;

	@media (min-width: 375px) {
		display: block;
	}
`;

export const ActionButtons = styled.div`
	display: flex;
`;

export const Logo = styled.div`
	font-size: 1.5rem;
	color: #fff;
	margin-right: 10px;
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
