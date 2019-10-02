import InfiniteScroll from 'react-infinite-scroll-component';
import React, { FunctionComponent } from 'react';
import { MY_RECIPES_QUERY } from 'src/user/user.graphql';
import { RecipeEdge } from 'src/recipe/types/recipe.interface';
import { RecipeList } from 'src/recipe/components/recipe-list/recipe-list.component';
import { Spinner } from 'src/shared/components/spinner/spinner.component';
import { useQuery } from 'react-apollo';

export const MyRecipesContainer: FunctionComponent = () => {
	const numberOfItemsToLoad = 15;
	const { data, fetchMore, loading } = useQuery(MY_RECIPES_QUERY, {
		variables: { first: numberOfItemsToLoad },
	});

	const result = data && data.myRecipes;
	const edges: RecipeEdge[] =
		((result && result.edges) as RecipeEdge[]) || [];
	const hasNextPage = result && result.pageInfo!.hasNextPage;
	const cursor = edges[edges.length - 1] && edges[edges.length - 1].cursor;

	const onLoadMore = () => {
		return fetchMore({
			query: MY_RECIPES_QUERY,
			variables: {
				first: numberOfItemsToLoad,
				after: cursor,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) {
					return prev;
				}

				return {
					...fetchMoreResult,
					myRecipes: {
						...fetchMoreResult.myRecipes!,
						edges: [
							...prev.myRecipes!.edges,
							...fetchMoreResult.myRecipes!.edges,
						],
					},
				};
			},
		});
	};

	return loading ? (
		<Spinner />
	) : (
		<React.Fragment>
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
