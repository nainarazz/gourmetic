import InfiniteScroll from 'react-infinite-scroll-component';
import React, { FunctionComponent } from 'react';
import { MY_LIKED_RECIPES } from '../../recipe.graphql';
import { MyLikedRecipes } from 'src/recipe/components/my-liked-recipes/my-liked-recipes.component';
import { RecipeReactionEdge } from 'src/recipe/types/recipe.interface';
import { Spinner } from 'src/shared/components/spinner/spinner.component';
import { SpinnerInfiniteScroll } from 'src/shared/components/spinner-infinite-scroll/spinner-infinite-scroll.component';
import { useQuery } from 'react-apollo';

export const MyLikedRecipesContainer: FunctionComponent = () => {
	const numberOfItemsToLoad = 15;
	const { data, loading, fetchMore } = useQuery(MY_LIKED_RECIPES, {
		variables: { first: numberOfItemsToLoad },
		fetchPolicy: 'cache-and-network',
	});

	const result = data && data.likedRecipes;

	const edges: RecipeReactionEdge[] =
		((result && result.edges) as RecipeReactionEdge[]) || [];
	const hasNextPage = result && result.pageInfo!.hasNextPage;
	const cursor = edges[edges.length - 1] && edges[edges.length - 1].cursor;

	const onLoadMore = () => {
		return fetchMore({
			query: MY_LIKED_RECIPES,
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
					likedRecipes: {
						...fetchMoreResult.likedRecipes!,
						edges: [
							...prev.likedRecipes!.edges,
							...fetchMoreResult.likedRecipes!.edges,
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
				loader={<SpinnerInfiniteScroll />}
				next={onLoadMore}
				scrollThreshold={0.9}
			>
				<MyLikedRecipes recipeEdges={edges} />
			</InfiniteScroll>
		</React.Fragment>
	);
};
