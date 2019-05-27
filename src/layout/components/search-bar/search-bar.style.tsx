import styled from 'styled-components';

interface SearchBarProps {
	searchInputExpanded: boolean;
}

export const SearchBar = styled.div`
	width: 60%;
	position: relative;
	display: flex;
	flex-grow: 1;
	justify-content: flex-end;

	input {
		display: flex;
		transform: ${(prop: SearchBarProps) =>
			prop.searchInputExpanded
				? 'translateX(10000px)'
				: 'translateX(0px)'};
		width: 100%;
		border: 3px solid transparent;
		border-right: none;
		padding: 0.6rem;
		border-radius: 2.18rem;
		outline: none;
		color: #5cb818;
		text-overflow: ellipsis;
		font-size: 1rem;
		margin: 0 0.5rem;
		transition: all 0.3s;
	}

	input:focus {
		color: #5cb818;
	}

	button {
		width: 2.5rem;
		height: 2.3rem;
		border: 1px solid transparent;
		border-radius: 50%;
		text-align: center;
		color: #fff;
		cursor: pointer;
		font-size: 1.25rem;
		background: #008000;
		outline: none;
		margin: 0.3rem 0.3rem 0 0;
	}

	@media (min-width: 769px) {
		input {
			display: flex;
			transform: translateX(0);
		}

		button {
			display: ${(prop: SearchBarProps) =>
				prop.searchInputExpanded ? 'none' : ''};
		}
	}
`;
