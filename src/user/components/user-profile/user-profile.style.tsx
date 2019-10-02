import Avatar from 'react-avatar';
import styled from 'styled-components';

export const ProfileContainer = styled.div``;
export const CoverImage = styled.div`
	position: relative;
	height: 155px;
	background: green;
	margin-bottom: 45px;
`;

export const StyledAvatar = styled(Avatar)`
	position: absolute;
	left: 10px;
	bottom: -15px;

	img {
		border: 3px solid #fff;
	}
`;

export const UserName = styled.div`
	font-weight: 600;
	font-size: 1.3rem;
	padding: 5px 10px;
`;

export const UserEmail = styled.div`
	padding: 0 10px;
	color: rgb(128, 128, 128);
`;
