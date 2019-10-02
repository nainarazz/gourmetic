import styled from 'styled-components';

export const StyledCard = styled.div`
	width: 100%;
	:hover {
		cursor: pointer;
	}
`;

export const ImageWrapper = styled.div`
	box-sizing: border-box;
	height: 20rem;
	position: relative;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
	border-radius: 12px;

	img {
		border-radius: 12px;
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
`;

export const Likes = styled.div`
	position: absolute;
	left: 0;
	bottom: 0;
	margin: 1rem;
`;
