import styled from 'styled-components';
import { borderColor } from 'src/shared/themes/colors';

export const TabList = styled.div`
	display: flex;
	justify-content: space-between;
	text-align: center;
	border-bottom: 1px solid ${borderColor.lightgrey};
	position: sticky;
	top: 4.5rem;
	font-size: 0.9rem;
	font-weight: 500;
	background-color: #fff;
`;

export const TabContent = styled.div`
	margin: 20px;
	font-size: 0.9rem;
`;
