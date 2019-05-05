import styled from 'styled-components';

export const ImageWrapper = styled.div`
	width: 19rem;
	position: relative;
	margin: 1rem 1rem 1rem;
	flex-grow: 1;

	@media (min-width: 768px) {
		max-width: 44%;
	}

	@media (min-width: 1020px) {
	}
`;

export const Photo = styled.div`
	border: 2px solid green;
	box-sizing: border-box;
	height: 18rem;
`;

export const CardDescription = styled.div`
	height: 30%;
	border: 2px solid red;
	position: absolute;
	bottom: 0;
	width: 100%;
	box-sizing: border-box;
`;
