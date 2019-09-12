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
					image {
						secureUrl
						publicId
					}
					createdBy {
						_id
						firstname
						lastname
					}
					meal
					prepTime
					cookingTime
					isPublic
					reaction {
						_id
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
			difficulty
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
			image {
				secureUrl
				publicId
			}
		}
	}
`;

export const LIKE_RECIPE = gql`
	mutation LikeRecipe($input: LikeRecipeInput!) {
		likeRecipe(input: $input) {
			_id
			isLiked
		}
	}
`;

export const CREATE_RECIPE = gql`
	mutation CreateRecipe($input: RecipeInput!) {
		createRecipe(recipeInput: $input) {
			_id
			name
		}
	}
`;

export const CREATE_USER = gql`
	mutation CreateUser($input: UserInput) {
		createUser(userInput: $input) {
			_id
			firstname
			lastname
			email
			photo
		}
	}
`;
