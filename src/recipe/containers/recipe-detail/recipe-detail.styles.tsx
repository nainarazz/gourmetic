import styled from 'styled-components';

export const RecipeDetailWrapper = styled.div`
	width: 100%;
	margin: auto;
	max-width: 800px;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
	border-radius: 2px;
	box-sizing: border-box;
	margin-bottom: 20px;

	@media (min-width: 768px) {
		width: 70%;
	}
`;

export const Image = styled.div`
	height: 200px;
	margin: auto;
	background: lightblue;

	@media (min-width: 768px) {
		height: 395px;
	}
`;
