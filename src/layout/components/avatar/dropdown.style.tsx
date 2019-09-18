import styled from 'styled-components';
import { borderColor, themeColor } from '../../../shared/themes/colors';

export const AvatarWrapper = styled.div`
	position: relative;
	:hover {
		cursor: pointer;
	}
`;

export const DropdownContent = styled.div`
	width: 200px;
	font-size: 0.8rem;
	border: 1px solid ${borderColor.lightgrey};
	position: absolute;
	background: #fff;
	top: 55px;
	z-index: 500;
	right: -40px;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

	:before {
		content: '';
		width: 10px;
		height: 10px;
		background: #fff;
		position: absolute;
		top: -7px;
		left: 75%;
		transform: translateX(-75%) rotate(45deg);
		border-left: 1px solid ${borderColor.lightgrey};
		border-top: 1px solid ${borderColor.lightgrey};
	}
`;

export const DropdownItem = styled.div`
	padding: 10px;

	:hover {
		cursor: pointer;
		background-color: ${themeColor.purple};
		opacity: 0.8;
		color: #fff;
	}
`;

export const UserInfo = styled.div`
	padding: 10px 0;
	margin: 0 10px;
	text-align: center;
	border-bottom: 1px solid ${borderColor.lightgrey};
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;
