export interface StateContextValue {
	searchValue: string;
	recipeFilters: string[];
	updateSearch: (searchTerm: string) => void;
	updateRecipeFilters: (recipeFilters: string[]) => void;
}
