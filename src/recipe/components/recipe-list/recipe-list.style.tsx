import styled from 'styled-components';
import { themeColor } from 'src/shared/themes/colors';

export const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: calc(95% - 0.5rem);
	margin: 0 auto;
	justify-content: center;
`;

export const CardWrapper = styled.div`
	width: 20rem;
	margin: 1rem 1rem 1rem;
`;

export const CardDescription = styled.div`
	width: 100%;
	box-sizing: border-box;
	padding-top: 1rem;
`;

export const RecipeName = styled.div`
	font-weight: 500;
	font-size: 1.2rem;
	color: ${themeColor.lightShadeSecondary};
`;

export const RecipeAuthor = styled.div`
	font-size: 0.9rem;
	margin-top: 2px;
`;

export const EmptyRecipeList = styled.div`
	font-size: 0.9rem;
	padding: 2rem;
`;
