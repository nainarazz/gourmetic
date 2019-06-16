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
				}
			}
		}
	}
	query RecipeDetail($id: ID) {
		recipeDetail(id: $id) {
			name
			description
			meal
		}
	}
`;
