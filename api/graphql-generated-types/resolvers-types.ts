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

/** The dummy queries and mutations are necessary because
 * graphql-js cannot have empty root types and we only extend
 * these types later on
 * Ref: apollographql/graphql-tools#293
 */
export type Query = {
	dummy?: Maybe<Scalars['String']>;
	recipeList?: Maybe<Array<Maybe<Recipe>>>;
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
	createdAt?: Maybe<Scalars['Date']>;
	updatedAt?: Maybe<Scalars['Date']>;
};

export type Subscription = {
	dummy?: Maybe<Scalars['String']>;
};

export type User = {
	_id: Scalars['ID'];
	firstName: Scalars['String'];
	lastName: Scalars['String'];
	email: Scalars['String'];
};
import { Context } from './context';

import {
	GraphQLResolveInfo,
	GraphQLScalarType,
	GraphQLScalarTypeConfig,
} from 'graphql';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
	fragment: string;
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
	resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
	TResult,
	TParent = {},
	TContext = {},
	TArgs = {}
> =
	| ((
			...args: any[]
	  ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
	TResult = {},
	TParent = {},
	TContext = {},
	TArgs = {}
> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Query: {};
	String: Scalars['String'];
	Recipe: Recipe;
	ID: Scalars['ID'];
	Meals: Meals;
	Int: Scalars['Int'];
	Ingredient: Ingredient;
	Instructions: Instructions;
	DietLabels: DietLabels;
	Boolean: Scalars['Boolean'];
	Date: Scalars['Date'];
	Mutation: {};
	Subscription: {};
	User: User;
};

export interface DateScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
	name: 'Date';
}

export type IngredientResolvers<
	ContextType = Context,
	ParentType = ResolversTypes['Ingredient']
> = {
	measurement?: Resolver<
		Maybe<ResolversTypes['String']>,
		ParentType,
		ContextType
	>;
	item?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	quantity?: Resolver<
		Maybe<ResolversTypes['String']>,
		ParentType,
		ContextType
	>;
};

export type InstructionsResolvers<
	ContextType = Context,
	ParentType = ResolversTypes['Instructions']
> = {
	imageUrl?: Resolver<
		Maybe<ResolversTypes['String']>,
		ParentType,
		ContextType
	>;
	stepNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
	description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<
	ContextType = Context,
	ParentType = ResolversTypes['Mutation']
> = {
	dummy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type QueryResolvers<
	ContextType = Context,
	ParentType = ResolversTypes['Query']
> = {
	dummy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	recipeList?: Resolver<
		Maybe<Array<Maybe<ResolversTypes['Recipe']>>>,
		ParentType,
		ContextType
	>;
};

export type RecipeResolvers<
	ContextType = Context,
	ParentType = ResolversTypes['Recipe']
> = {
	_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	meal?: Resolver<
		Maybe<Array<Maybe<ResolversTypes['Meals']>>>,
		ParentType,
		ContextType
	>;
	prepTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	cookingTime?: Resolver<
		Maybe<ResolversTypes['Int']>,
		ParentType,
		ContextType
	>;
	ingredients?: Resolver<
		Array<ResolversTypes['Ingredient']>,
		ParentType,
		ContextType
	>;
	instructions?: Resolver<
		Array<Maybe<ResolversTypes['Instructions']>>,
		ParentType,
		ContextType
	>;
	yield?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
	image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	dietLabels?: Resolver<
		Maybe<Array<Maybe<ResolversTypes['DietLabels']>>>,
		ParentType,
		ContextType
	>;
	isPublic?: Resolver<
		Maybe<ResolversTypes['Boolean']>,
		ParentType,
		ContextType
	>;
	createdAt?: Resolver<
		Maybe<ResolversTypes['Date']>,
		ParentType,
		ContextType
	>;
	updatedAt?: Resolver<
		Maybe<ResolversTypes['Date']>,
		ParentType,
		ContextType
	>;
};

export type SubscriptionResolvers<
	ContextType = Context,
	ParentType = ResolversTypes['Subscription']
> = {
	dummy?: SubscriptionResolver<
		Maybe<ResolversTypes['String']>,
		ParentType,
		ContextType
	>;
};

export type UserResolvers<
	ContextType = Context,
	ParentType = ResolversTypes['User']
> = {
	_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
	Date?: GraphQLScalarType;
	Ingredient?: IngredientResolvers<ContextType>;
	Instructions?: InstructionsResolvers<ContextType>;
	Mutation?: MutationResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	Recipe?: RecipeResolvers<ContextType>;
	Subscription?: SubscriptionResolvers<ContextType>;
	User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
