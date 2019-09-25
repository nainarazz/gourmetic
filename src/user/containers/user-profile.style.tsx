import styled from 'styled-components';

export const UserProfileWrapper = styled.div`
	display: flex;
	width: 95%;
	margin: auto;
`;

export const UserAccountSection = styled.div`
	width: 25%;
	margin-right: 3%;
	display: none;

	@media (min-width: 1080px) {
		display: block;
	}
`;
export const UserActivitySection = styled.div`
	box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15), 0 0px 2px rgba(0, 0, 0, 0.15);
	min-height: 80vh;
	width: 100%;

	@media (min-width: 1080px) {
		width: 75%;
	}
`;
