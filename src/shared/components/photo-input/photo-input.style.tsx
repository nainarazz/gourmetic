import styled from 'styled-components';

export const Label = styled.label`
	font-size: 1.25em;
	font-weight: 700;
	color: white;
	width: 100%;
	height: 300px;
	display: inline-block;
	position: relative;

	:hover {
		cursor: pointer;
	}

	@media (min-width: 768px) {
		height: 395px;
	}
`;

export const Input = styled.input`
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	z-index: -1;
`;

export const Image = styled.img`
	background: url(${props => props.src || ''}) no-repeat center center;
	background-size: cover;
	width: 100%;
	height: 100%;
	max-width: 100%;
`;
