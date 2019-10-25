import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchBar } from './search-bar.style';
import { StateContextValue } from 'src/context/state-context.types';
import { useStateValue } from 'src/context/state-context';
import {
	faSearch as search,
	faTimes as closeButton,
} from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
	searchInputExpanded: boolean;
	toggleSearchInput: () => void;
}

export const SearchBarComponent: React.SFC<SearchBarProps> = props => {
	const { updateSearch }: StateContextValue = useStateValue();

	const icon = props.searchInputExpanded ? (
		<FontAwesomeIcon icon={search} />
	) : (
		<FontAwesomeIcon icon={closeButton} />
	);

	// tslint:disable-next-line:no-any
	const updateInput = (event: any) => {
		// debounce
		updateSearch(event.target.value);
		// TODO redirect to search results if not in page yet
	};

	return (
		<SearchBar searchInputExpanded={props.searchInputExpanded}>
			<input
				type="text"
				placeholder="What food are you looking for?"
				onChange={updateInput}
			/>
			<button onClick={props.toggleSearchInput}>{icon}</button>
		</SearchBar>
	);
};
