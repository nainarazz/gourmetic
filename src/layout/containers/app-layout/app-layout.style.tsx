import styled from 'styled-components';

export const PlusButton = styled.div`
	position: fixed;
	right: 45px;
	bottom: 30px;
	border-radius: 50%;
	background-color: #5cb818;
	width: 55px;
	height: 55px;
	font-size: 3rem;
	color: #fff;
	text-align: center;

	:hover {
		cursor: pointer;
	}

	display: none;
	@media (min-width: 1020px) {
		display: block;
	}
`;
