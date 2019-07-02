import gql from 'graphql-tag';

export const RECIPE_LIST_QUERY = gql`
	query RecipeList($first: Int, $after: String) {
		recipeList(first: $first, after: $after) {
			pageInfo {
				hasNextPage
			}
			edges {
				cursor
				node {
					_id
					name
					description
					meal
					createdAt
					updatedAt
					ingredients {
						item
						measurement
						quantity
					}
					instructions {
						stepNumber
						description
						imageUrl
					}
					image
					createdBy {
						firstname
						lastname
					}
					meal
					prepTime
					cookingTime
					isPublic
					reaction {
						isLiked
					}
				}
			}
		}
	}
`;

export const RECIPE_DETAIL = gql`
	query RecipeDetail($id: ID) {
		recipeDetail(id: $id) {
			name
			description
			prepTime
			cookingTime
			ingredients {
				item
				quantity
				measurement
			}
			instructions {
				imageUrl
				stepNumber
				description
			}
			createdBy {
				firstname
				lastname
			}
		}
	}
`;

export const LIKE_RECIPE = gql`
	mutation LikeRecipe($recipeId: ID!) {
		likeRecipe(recipeId: $recipeId) {
			recipe {
				_id
			}
			user {
				_id
			}
			isLiked
		}
	}
`;
