import Avatar from 'react-avatar';
import styled from 'styled-components';

export const RecipeInfo = styled.div`
	width: 90%;
	margin: auto;
`;

export const UserPhoto = styled(Avatar)`
	margin-bottom: 10px;
`;

export const RecipeAuthorContainer = styled.div`
	text-align: center;
	padding-top: 20px;
`;

export const AuthorName = styled.div`
	font-size: 0.9rem;
`;

export const RecipeTitle = styled.h2`
	text-align: center;
	margin-bottom: 10px;
`;

export const Description = styled.div`
	text-align: center;
	font-style: italic;
	font-size: 0.9rem;
`;

export const AdditionalInfo = styled.div`
	display: flex;
	justify-content: space-evenly;
	width: 90%;
	margin: auto;
`;

export const SubHeader = styled.div`
	.title {
		margin-bottom: 10px;
		font-weight: 500;
	}

	.value {
		font-size: 0.9rem;
	}
`;
