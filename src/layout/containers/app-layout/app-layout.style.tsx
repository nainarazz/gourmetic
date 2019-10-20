import styled from 'styled-components';
import { themeColor } from 'src/shared/themes/colors';

export const Main = styled.div`
	padding-top: 6rem;
	width: 95%;
	height: calc(100vh - 6rem);
	margin: auto;
	position: relative;
`;

export const PlusButton = styled.div`
	position: fixed;
	right: 5%;
	bottom: 30px;
	border-radius: 50%;
	background-color: ${themeColor.darkShadeMainBrand};
	padding: 15px;
	color: #fff;
	text-align: center;

	:hover {
		cursor: pointer;
	}
`;
