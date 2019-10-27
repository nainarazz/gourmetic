import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';
import Router, { useRouter } from 'next/router';
import { RECIPE_LIST_QUERY } from '../../recipe.graphql';
import { RecipeEdge } from '../../types/recipe.interface';
import { RecipeFilters } from 'src/recipe/components/recipe-filter/recipe-filter.component';
import { RecipeList } from '../../components/recipe-list/recipe-list.component';
import { Spinner } from 'src/shared/components/spinner/spinner.component';
import { useQuery } from 'react-apollo';
import { useStateValue } from 'src/context/state-context';

export const RecipeListRoot = () => {
	const numberOfPagesToLoad = 15;
	const { updateRecipeFilters } = useStateValue();
	const userRouter = useRouter();
	const { data, fetchMore, loading } = useQuery(RECIPE_LIST_QUERY, {
		variables: { first: numberOfPagesToLoad },
	});

	const result = data && data.recipeList;
	const edges: RecipeEdge[] =
		((result && result.edges) as RecipeEdge[]) || [];
	const hasNextPage = result && result.pageInfo!.hasNextPage;
	const cursor = edges[edges.length - 1] && edges[edges.length - 1].cursor;

	const onLoadMore = () => {
		return fetchMore({
			query: RECIPE_LIST_QUERY,
			variables: {
				first: numberOfPagesToLoad,
				after: cursor,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) {
					return prev;
				}

				return {
					...fetchMoreResult,
					recipeList: {
						...fetchMoreResult.recipeList!,
						edges: [
							...prev.recipeList!.edges,
							...fetchMoreResult.recipeList!.edges,
						],
					},
				};
			},
		});
	};

	const onSelectFilter = (selectedFilters: string[]) => {
		updateRecipeFilters(selectedFilters);
		if (userRouter.pathname !== '/search-result') {
			Router.push('/search-result');
		}
	};

	return loading ? (
		<Spinner />
	) : (
		<React.Fragment>
			<RecipeFilters
				initialFilters={[]}
				onSelectFilter={onSelectFilter}
			/>
			<InfiniteScroll
				dataLength={edges.length}
				hasMore={hasNextPage || false}
				loader={<h4>loading...</h4>}
				next={onLoadMore}
				scrollThreshold={0.9}
			>
				<RecipeList recipeEdges={edges} />
			</InfiniteScroll>
		</React.Fragment>
	);
};
