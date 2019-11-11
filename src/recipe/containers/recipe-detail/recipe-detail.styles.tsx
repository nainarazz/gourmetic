import styled from 'styled-components';

export const RecipeDetailWrapper = styled.div`
	width: 100%;
	margin: auto;
	max-width: 800px;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
	border-radius: 2px;
	box-sizing: border-box;
	margin-bottom: 20px;

	@media (min-width: 769px) {
		width: 70%;
	}
`;

export const ImageWrapper = styled.div`
	height: auto;
	margin: auto;
	text-align: center;
	background: lightgrey;

	position: relative;
	img {
		max-height: 395px;
		max-width: 100%;
	}
`;

export const LoveIcon = styled.div`
	position: absolute;
	right: 0;
	top: 0;
	margin: 1rem;
	.optimistic {
		color: green;
	}

	:hover {
		cursor: pointer;
	}
`;
