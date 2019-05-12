import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchBar } from './styles';
import {
	faSearch as search,
	faTimes as closeButton,
} from '@fortawesome/free-solid-svg-icons';

export const SearchBarComponent = props => {
	const icon = props.searchInputExpanded ? (
		<FontAwesomeIcon icon={search} />
	) : (
		<FontAwesomeIcon icon={closeButton} />
	);
	return (
		<SearchBar searchInputExpanded={props.searchInputExpanded}>
			<input type="text" placeholder="What food are you looking for?" />
			<button onClick={props.searchClickHandler}>{icon}</button>
		</SearchBar>
	);
};
