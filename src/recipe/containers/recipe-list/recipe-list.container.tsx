import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';
import { RECIPE_LIST_QUERY } from '../../recipe.graphql';
import { RecipeEdge } from '../../../../api/graphql-generated-types/resolvers-types';
import { RecipeList } from '../../components/recipe-list/recipe-list.component';
import { useQuery } from 'react-apollo';

export const RecipeListRoot = () => {
	const numberOfPagesToLoad = 15;
	const { data, fetchMore } = useQuery(RECIPE_LIST_QUERY, {
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

	return (
		<InfiniteScroll
			dataLength={edges.length}
			hasMore={hasNextPage || false}
			loader={<h4>loading...</h4>}
			next={onLoadMore}
			scrollThreshold={0.9}
		>
			<RecipeList recipeEdges={edges} />;
		</InfiniteScroll>
	);
};
