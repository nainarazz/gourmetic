import styled from 'styled-components';

export const Container = styled.div`
	position: fixed;
	background-color: #5cb818;
	width: 100%;
	padding: 1rem;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const HeaderItems = styled.div`
	width: 90%;
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin: auto;
`;

export const ButtonsContainer = styled.div`
	display: flex;
`;

export const Button = styled.div`
	padding: 0.25rem 0.5rem;
	font-size: 1.09375rem;
	background-color: #fff;
	color: #5cb818;
	margin: 0 10px;
	border-radius: 8px;
	font-weight: 500;
	line-height: 1.5;

	:hover {
		cursor: pointer;
	}
`;

export const Logo = styled.div`
	font-size: 2rem;
	color: #f2f0f2;
`;

export const SearchBar = styled.div`
	width: 60%;
	position: relative;
	display: flex;

	input {
		width: 100%;
		border: 3px solid transparent;
		border-right: none;
		padding: 0.6rem;
		border-radius: 2.18rem 0 0 2.18rem;
		outline: none;
		color: #5cb818;
		text-overflow: ellipsis;
		font-size: 1rem;
	}

	input:focus {
		color: #5cb818;
	}

	button {
		width: 2.5rem;
		height: 3.125rem;
		border: 1px solid transparent;
		text-align: center;
		color: #fff;
		border-radius: 0 2.18rem 2.18rem 0;
		cursor: pointer;
		font-size: 1.25rem;
	}
`;
