import React from 'react';
import Router, { useRouter } from 'next/router';
import { debounce } from 'lodash';
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
	const { searchValue, updateSearch }: StateContextValue = useStateValue();
	const userRouter = useRouter();

	const icon = props.searchInputExpanded ? (
		<FontAwesomeIcon icon={search} />
	) : (
		<FontAwesomeIcon icon={closeButton} />
	);

	const onChangeHandler = debounce(searchTerm => {
		updateSearch(searchTerm);
		if (userRouter.pathname !== '/search-result') {
			Router.push('/search-result');
		}
	}, 300);

	return (
		<SearchBar searchInputExpanded={props.searchInputExpanded}>
			<input
				type="text"
				placeholder="What food are you looking for?"
				onChange={e => onChangeHandler(e.target.value)}
				defaultValue={searchValue}
			/>
			<button onClick={props.toggleSearchInput}>{icon}</button>
		</SearchBar>
	);
};
