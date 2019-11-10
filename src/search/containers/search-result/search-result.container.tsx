import InfiniteScroll from 'react-infinite-scroll-component';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { RecipeEdge } from 'src/recipe/types/recipe.interface';
import { RecipeFilters } from 'src/recipe/components/recipe-filter/recipe-filter.component';
import { RecipeList } from 'src/recipe/components/recipe-list/recipe-list.component';
import { RecipeSearchCriteria } from 'src/search/types/recipe-search.interface';
import { SEARCH_RECIPE } from 'src/recipe/recipe.graphql';
import { Spinner } from 'src/shared/components/spinner/spinner.component';
import { SpinnerInfiniteScroll } from 'src/shared/components/spinner-infinite-scroll/spinner-infinite-scroll.component';
import { useQuery } from 'react-apollo';
import { useStateValue } from 'src/context/state-context';

export const SearchResultContainer: FunctionComponent = () => {
	const numberOfPagesToLoad = 15;
	const { searchValue, recipeFilters, updateRecipeFilters } = useStateValue();
	const [searchCriteria, setSearchCriteria] = useState<RecipeSearchCriteria>({
		name: '',
		meal: [],
	});

	useEffect(() => {
		setSearchCriteria({
			...searchCriteria,
			name: searchValue,
			meal: recipeFilters,
		});
	}, [searchValue, recipeFilters]);

	const { data, fetchMore, loading } = useQuery(SEARCH_RECIPE, {
		variables: { first: numberOfPagesToLoad, searchInput: searchCriteria },
	});

	const result = data && data.searchRecipes;
	const edges: RecipeEdge[] =
		((result && result.edges) as RecipeEdge[]) || [];
	const hasNextPage = result && result.pageInfo!.hasNextPage;
	const cursor = edges[edges.length - 1] && edges[edges.length - 1].cursor;

	const onLoadMore = () => {
		return fetchMore({
			query: SEARCH_RECIPE,
			variables: {
				first: numberOfPagesToLoad,
				after: cursor,
				searchInput: searchCriteria,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) {
					return prev;
				}

				return {
					...fetchMoreResult,
					searchRecipes: {
						...fetchMoreResult.searchRecipes!,
						edges: [
							...prev.searchRecipes!.edges,
							...fetchMoreResult.searchRecipes!.edges,
						],
					},
				};
			},
		});
	};

	const onSelectFilter = (selectedFilters: string[]) => {
		updateRecipeFilters(selectedFilters);
	};

	return loading ? (
		<Spinner />
	) : (
		<React.Fragment>
			<RecipeFilters
				initialFilters={recipeFilters}
				onSelectFilter={onSelectFilter}
			/>
			<InfiniteScroll
				dataLength={edges.length}
				hasMore={hasNextPage || false}
				loader={<SpinnerInfiniteScroll />}
				next={onLoadMore}
				scrollThreshold={0.9}
			>
				<RecipeList recipeEdges={edges} />
			</InfiniteScroll>
		</React.Fragment>
	);
};
