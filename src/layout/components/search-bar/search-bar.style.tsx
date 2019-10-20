import styled from 'styled-components';
import { themeColor } from 'src/shared/themes/colors';

interface SearchBarProps {
	searchInputExpanded: boolean;
}

export const SearchBar = styled.div`
	width: 55%;
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
		color: ${themeColor.mainBrand};
		text-overflow: ellipsis;
		font-size: 0.8rem;
		margin: 0 0.5rem;
		transition: all 0.3s;
	}

	input:focus {
		color: ${themeColor.mainBrand};
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
		background: ${themeColor.darkShadeMainBrand};
		outline: none;
		margin: 0.3rem 0.3rem 0 0;
	}

	@media (min-width: 769px) {
		flex-grow: 1;
		input {
			display: flex;
			transform: translateX(0);
		}

		button {
			display: ${(prop: SearchBarProps) =>
				prop.searchInputExpanded ? 'none' : ''};
		}
	}

	@media (min-width: 1020px) {
		flex-grow: initial;
	}
`;
