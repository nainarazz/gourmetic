import styled from 'styled-components';

export const RecipeOverview = styled.div`
	display: flex;
	justify-content: space-evenly;
	padding-bottom: 20px;

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
	padding: 0 15px;
`;
