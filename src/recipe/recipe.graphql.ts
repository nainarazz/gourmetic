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
						photo
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
				photo
				OAuthUniqueAccountId
			}
			meal
			image {
				secureUrl
				publicId
			}
			reaction {
				_id
				isLiked
			}
			yield
			isPublic
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

export const UPDATE_RECIPE = gql`
	mutation UpdateRecipe($id: String!, $recipe: RecipeInput!) {
		updateRecipe(id: $id, updatedRecipe: $recipe) {
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
				photo
			}
			meal
			image {
				secureUrl
				publicId
			}
			yield
			isPublic
		}
	}
`;

export const DELETE_RECIPE = gql`
	mutation DeleteRecipe($input: DeleteRecipeInput!) {
		deleteRecipe(input: $input) {
			_id
			name
		}
	}
`;

export const SEARCH_RECIPE = gql`
	query SearchRecipe(
		$searchInput: SearchRecipeInput!
		$first: Int
		$after: String
	) {
		searchRecipes(searchInput: $searchInput, first: $first, after: $after) {
			pageInfo {
				hasNextPage
			}
			edges {
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
						photo
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
				cursor
			}
		}
	}
`;

export const UPLOAD_IMAGE = gql`
	mutation UploadImage($file: Upload!) {
		uploadImage(file: $file) {
			secureUrl
			publicId
		}
	}
`;

export const DELETE_IMAGE = gql`
	mutation DeleteImage($publicId: String!) {
		deleteImage(publicId: $publicId)
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

export const MY_RECIPES_QUERY = gql`
	query MyRecipes($first: Int, $after: String) {
		myRecipes(first: $first, after: $after) {
			pageInfo {
				hasNextPage
			}
			edges {
				cursor
				node {
					_id
					name
					description
					updatedAt
					image {
						secureUrl
						publicId
					}
					createdBy {
						_id
						firstname
						lastname
						photo
						OAuthUniqueAccountId
					}
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

export const MY_LIKED_RECIPES = gql`
	query MyLikedRecipes($first: Int, $after: String) {
		likedRecipes(first: $first, after: $after) {
			pageInfo {
				hasNextPage
			}
			edges {
				node {
					_id
					recipe {
						_id
						name
						description
						instructions {
							stepNumber
							description
						}
						image {
							publicId
							secureUrl
						}
						meal
						difficulty
						ingredients {
							quantity
							item
							measurement
						}
						reaction {
							_id
							isLiked
						}
						isPublic
						prepTime
						cookingTime
					}
				}
				cursor
			}
		}
	}
`;
