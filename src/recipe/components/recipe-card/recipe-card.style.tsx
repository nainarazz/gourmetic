import styled from 'styled-components';

export const StyledCard = styled.div`
	width: 19rem;
	position: relative;
	margin: 1rem 1rem 1rem;
	flex-grow: 1;

	@media (min-width: 730px) {
		max-width: 44%;
	}

	@media (min-width: 1020px) {
		max-width: 44%;
	}

	@media (min-width: 1330px) {
		max-width: 30%;
	}

	:hover {
		cursor: pointer;
	}
`;

export const ImageWrapper = styled.div`
	box-sizing: border-box;
	height: 15rem;
	position: relative;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
	border-radius: 12px;

	img {
		border-radius: 12px;
		max-width: 100%;
	}
`;

export const CardDescription = styled.div`
	width: 100%;
	box-sizing: border-box;
	padding-top: 1.5rem;
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
