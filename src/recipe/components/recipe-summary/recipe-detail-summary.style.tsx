import Avatar from 'react-avatar';
import styled from 'styled-components';

export const RecipeOverview = styled.div`
	display: flex;
	justify-content: space-evenly;
	padding: 15px 0;
	width: 90%;
	margin: auto;

	.item {
		text-align: center;
	}
`;

export const Description = styled.div`
	.recipe-author,
	.recipe-title {
		text-align: center;
		padding: 20px 0;
	}
	.description {
		text-align: center;
	}
	width: 90%;
	margin: auto;
	padding: 15px 0;
`;

export const UserPhoto = styled(Avatar)``;
