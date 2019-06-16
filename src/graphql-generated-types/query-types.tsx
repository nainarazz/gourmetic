// tslint:disable
import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApollo from 'react-apollo';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	Date: any;
};

export enum DietLabels {
	LowSalt = 'LOW_SALT',
	HighProtein = 'HIGH_PROTEIN',
	Vegan = 'VEGAN',
}

export type Ingredient = {
	measurement?: Maybe<Scalars['String']>;
	item: Scalars['String'];
	quantity?: Maybe<Scalars['String']>;
};

export type Instructions = {
	imageUrl?: Maybe<Scalars['String']>;
	stepNumber: Scalars['Int'];
	description: Scalars['String'];
};

export enum Meals {
	Breakfast = 'BREAKFAST',
	Lunch = 'LUNCH',
	Supper = 'SUPPER',
	Snack = 'SNACK',
	Dessert = 'DESSERT',
	Entree = 'ENTREE',
}

export type Mutation = {
	dummy?: Maybe<Scalars['String']>;
};

export type PageInfo = {
	hasNextPage: Scalars['Boolean'];
};

/** The dummy queries and mutations are necessary because
 * graphql-js cannot have empty root types and we only extend
 * these types later on
 * Ref: apollographql/graphql-tools#293
 */
export type Query = {
	dummy?: Maybe<Scalars['String']>;
	recipeList?: Maybe<RecipeResult>;
	recipeDetail?: Maybe<Recipe>;
};

/** The dummy queries and mutations are necessary because
 * graphql-js cannot have empty root types and we only extend
 * these types later on
 * Ref: apollographql/graphql-tools#293
 */
export type QueryRecipeListArgs = {
	first?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
};

/** The dummy queries and mutations are necessary because
 * graphql-js cannot have empty root types and we only extend
 * these types later on
 * Ref: apollographql/graphql-tools#293
 */
export type QueryRecipeDetailArgs = {
	id?: Maybe<Scalars['ID']>;
};

export type Recipe = {
	_id: Scalars['ID'];
	name: Scalars['String'];
	description: Scalars['String'];
	meal?: Maybe<Array<Maybe<Meals>>>;
	prepTime?: Maybe<Scalars['Int']>;
	cookingTime?: Maybe<Scalars['Int']>;
	ingredients: Array<Ingredient>;
	instructions: Array<Maybe<Instructions>>;
	yield?: Maybe<Scalars['Int']>;
	image?: Maybe<Scalars['String']>;
	dietLabels?: Maybe<Array<Maybe<DietLabels>>>;
	isPublic?: Maybe<Scalars['Boolean']>;
	createdBy?: Maybe<User>;
	createdAt?: Maybe<Scalars['Date']>;
	updatedAt?: Maybe<Scalars['Date']>;
};

export type RecipeEdge = {
	cursor: Scalars['String'];
	node: Recipe;
};

export type RecipeResult = {
	pageInfo?: Maybe<PageInfo>;
	edges: Array<Maybe<RecipeEdge>>;
};

export type Subscription = {
	dummy?: Maybe<Scalars['String']>;
};

export type User = {
	_id: Scalars['ID'];
	firstname: Scalars['String'];
	lastname: Scalars['String'];
	email: Scalars['String'];
};
export type RecipeListQueryVariables = {
	first?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
};

export type RecipeListQuery = {
	recipeList: Maybe<{
		pageInfo: Maybe<Pick<PageInfo, 'hasNextPage'>>;
		edges: Array<
			Maybe<
				Pick<RecipeEdge, 'cursor'> & {
					node: Pick<
						Recipe,
						| '_id'
						| 'name'
						| 'description'
						| 'meal'
						| 'createdAt'
						| 'updatedAt'
						| 'image'
						| 'meal'
						| 'prepTime'
						| 'cookingTime'
						| 'isPublic'
					> & {
						ingredients: Array<
							Pick<
								Ingredient,
								'item' | 'measurement' | 'quantity'
							>
						>;
						instructions: Array<
							Maybe<
								Pick<
									Instructions,
									'stepNumber' | 'description' | 'imageUrl'
								>
							>
						>;
						createdBy: Maybe<Pick<User, 'firstname' | 'lastname'>>;
					};
				}
			>
		>;
	}>;
};

export type RecipeDetailQueryVariables = {
	id?: Maybe<Scalars['ID']>;
};

export type RecipeDetailQuery = {
	recipeDetail: Maybe<
		Pick<Recipe, 'name' | 'description' | 'prepTime' | 'cookingTime'> & {
			ingredients: Array<
				Pick<Ingredient, 'item' | 'quantity' | 'measurement'>
			>;
			instructions: Array<
				Maybe<
					Pick<
						Instructions,
						'imageUrl' | 'stepNumber' | 'description'
					>
				>
			>;
			createdBy: Maybe<Pick<User, 'firstname' | 'lastname'>>;
		}
	>;
};

export const RecipeListDocument = gql`
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
`;
export type RecipeListComponentProps = Omit<
	Omit<
		ReactApollo.QueryProps<RecipeListQuery, RecipeListQueryVariables>,
		'query'
	>,
	'variables'
> & { variables?: RecipeListQueryVariables };

export const RecipeListComponent = (props: RecipeListComponentProps) => (
	<ReactApollo.Query<RecipeListQuery, RecipeListQueryVariables>
		query={RecipeListDocument}
		{...props}
	/>
);

export type RecipeListProps<TChildProps = {}> = Partial<
	ReactApollo.DataProps<RecipeListQuery, RecipeListQueryVariables>
> &
	TChildProps;
export function withRecipeList<TProps, TChildProps = {}>(
	operationOptions?: ReactApollo.OperationOption<
		TProps,
		RecipeListQuery,
		RecipeListQueryVariables,
		RecipeListProps<TChildProps>
	>
) {
	return ReactApollo.withQuery<
		TProps,
		RecipeListQuery,
		RecipeListQueryVariables,
		RecipeListProps<TChildProps>
	>(RecipeListDocument, {
		alias: 'withRecipeList',
		...operationOptions,
	});
}
export const RecipeDetailDocument = gql`
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
export type RecipeDetailComponentProps = Omit<
	Omit<
		ReactApollo.QueryProps<RecipeDetailQuery, RecipeDetailQueryVariables>,
		'query'
	>,
	'variables'
> & { variables?: RecipeDetailQueryVariables };

export const RecipeDetailComponent = (props: RecipeDetailComponentProps) => (
	<ReactApollo.Query<RecipeDetailQuery, RecipeDetailQueryVariables>
		query={RecipeDetailDocument}
		{...props}
	/>
);

export type RecipeDetailProps<TChildProps = {}> = Partial<
	ReactApollo.DataProps<RecipeDetailQuery, RecipeDetailQueryVariables>
> &
	TChildProps;
export function withRecipeDetail<TProps, TChildProps = {}>(
	operationOptions?: ReactApollo.OperationOption<
		TProps,
		RecipeDetailQuery,
		RecipeDetailQueryVariables,
		RecipeDetailProps<TChildProps>
	>
) {
	return ReactApollo.withQuery<
		TProps,
		RecipeDetailQuery,
		RecipeDetailQueryVariables,
		RecipeDetailProps<TChildProps>
	>(RecipeDetailDocument, {
		alias: 'withRecipeDetail',
		...operationOptions,
	});
}
