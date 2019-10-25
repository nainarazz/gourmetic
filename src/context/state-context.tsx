import React, { useContext, useState } from 'react';
import { StateContextValue } from './state-context.types';

export const StateContext = React.createContext<StateContextValue>({
	recipeFilters: [],
	searchValue: '',
	updateSearch: (searchTerm: string) => {
		return;
	},
	updateRecipeFilters: (filters: string[]) => {
		return;
	},
});
export const useStateValue = () => useContext(StateContext);

// tslint:disable-next-line:no-any
export const StateProvider = ({ children }: any) => {
	const [searchValue, setSearchValue] = useState('');
	const [recipeFilters, setRecipeFilters] = useState<string[]>([]);

	const updateSearch = (search: string) => setSearchValue(search);
	const updateRecipeFilters = (filters: string[]) =>
		setRecipeFilters(filters);

	return (
		<StateContext.Provider
			value={{
				searchValue,
				recipeFilters,
				updateSearch,
				updateRecipeFilters,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};
