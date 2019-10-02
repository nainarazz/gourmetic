import gql from 'graphql-tag';

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
