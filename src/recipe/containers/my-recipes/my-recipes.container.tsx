import InfiniteScroll from 'react-infinite-scroll-component';
import React, { FunctionComponent } from 'react';
import { MyRecipes } from 'src/recipe/components/my-recipes/my-recipes.component';
import { Recipe, RecipeEdge } from 'src/recipe/types/recipe.interface';
import { Spinner } from 'src/shared/components/spinner/spinner.component';
import { SpinnerInfiniteScroll } from 'src/shared/components/spinner-infinite-scroll/spinner-infinite-scroll.component';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from 'react-apollo';
import {
	DELETE_RECIPE,
	RECIPE_LIST_QUERY,
	MY_RECIPES_QUERY,
	DELETE_IMAGE,
} from '../../recipe.graphql';

export const MyRecipesContainer: FunctionComponent = () => {
	const numberOfItemsToLoad = 15;
	const { data, fetchMore, loading: loadingRecipes } = useQuery(
		MY_RECIPES_QUERY,
		{
			variables: { first: numberOfItemsToLoad },
		}
	);

	const [deleteRecipeMutation, { loading: deletingRecipe }] = useMutation(
		DELETE_RECIPE
	);
	const [deleteImageMutation] = useMutation(DELETE_IMAGE);

	const deleteHandler = async (recipe: Recipe) => {
		try {
			await deleteRecipeMutation({
				variables: {
					input: {
						recipeId: recipe._id,
						reactionId: recipe.reaction._id || '',
					},
				},
				refetchQueries: () => [
					{
						query: MY_RECIPES_QUERY,
						variables: {
							first: numberOfItemsToLoad,
						},
					},
					{
						query: RECIPE_LIST_QUERY,
						variables: {
							first: numberOfItemsToLoad,
						},
					},
				],
			});

			if (recipe.image.publicId) {
				deleteImageMutation({
					variables: { publicId: recipe.image.publicId },
				});
			}

			toast.success('🚀 Successfully deleted recipe!', {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		} catch (error) {
			toast.error('A problem occured when deleting recipe.');
		}
	};

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

	return loadingRecipes || deletingRecipe ? (
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
				<MyRecipes recipeEdges={edges} deleteHandler={deleteHandler} />
			</InfiniteScroll>
		</React.Fragment>
	);
};
