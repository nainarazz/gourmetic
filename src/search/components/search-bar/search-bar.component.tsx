import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
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
	const [searchKeyword, setSearchKeyword] = useState('');
	const userRouter = useRouter();

	const icon = props.searchInputExpanded ? (
		<FontAwesomeIcon icon={search} />
	) : (
		<FontAwesomeIcon icon={closeButton} />
	);

	const onChangeHandler = (searchText: string) => {
		setSearchKeyword(searchText);
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateSearch(searchKeyword);
		if (userRouter.pathname !== '/search-result') {
			Router.push('/search-result');
		}
	};

	return (
		<SearchBar searchInputExpanded={props.searchInputExpanded}>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="What food are you looking for?"
					onChange={e => onChangeHandler(e.target.value)}
					defaultValue={searchValue}
				/>
				<button type="button" onClick={props.toggleSearchInput}>
					{icon}
				</button>
			</form>
		</SearchBar>
	);
};
