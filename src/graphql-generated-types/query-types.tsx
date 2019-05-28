// tslint:disable

export type Maybe<T> = T | null;
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

export type RecipeListQuery = { __typename?: 'Query' } & {
	recipeList: Maybe<
		{ __typename?: 'RecipeResult' } & {
			pageInfo: Maybe<
				{ __typename?: 'PageInfo' } & Pick<PageInfo, 'hasNextPage'>
			>;
			edges: Array<
				Maybe<
					{ __typename?: 'RecipeEdge' } & Pick<
						RecipeEdge,
						'cursor'
					> & {
							node: { __typename?: 'Recipe' } & Pick<
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
										{ __typename?: 'Ingredient' } & Pick<
											Ingredient,
											'item' | 'measurement' | 'quantity'
										>
									>;
									instructions: Array<
										Maybe<
											{
												__typename?: 'Instructions';
											} & Pick<
												Instructions,
												| 'stepNumber'
												| 'description'
												| 'imageUrl'
											>
										>
									>;
								};
						}
				>
			>;
		}
	>;
};

import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApollo from 'react-apollo';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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
					meal
					prepTime
					cookingTime
					isPublic
				}
			}
		}
	}
`;

export const RecipeListComponent = (
	props: Omit<
		Omit<
			ReactApollo.QueryProps<RecipeListQuery, RecipeListQueryVariables>,
			'query'
		>,
		'variables'
	> & { variables?: RecipeListQueryVariables }
) => (
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
