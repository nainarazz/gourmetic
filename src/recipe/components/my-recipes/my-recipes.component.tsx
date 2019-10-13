import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Recipe, RecipeEdge } from 'src/recipe/types/recipe.interface';
import { RecipeCardContainer } from 'src/recipe/containers/recipe-card/recipe-card.container';
import {
	faEdit as editIcon,
	faTrashAlt as deleteIcon,
} from '@fortawesome/free-regular-svg-icons';
import {
	CardWrapper,
	CardDescription,
	Container,
	IconsContainer,
	RecipeName,
	Icon,
} from './my-recipes.styles';

interface RecipeListProps {
	recipeEdges: RecipeEdge[];
	deleteHandler: (recipe: Recipe) => void;
}

export const MyRecipes: FunctionComponent<RecipeListProps> = props => {
	if (!props.recipeEdges) {
		return null;
	}
	const recipes = props.recipeEdges.map((e, i) => {
		const previousRecipeId =
			(props.recipeEdges[i - 1] && props.recipeEdges[i - 1].node._id) ||
			'';
		const recipe = e.node;
		return (
			<CardWrapper key={e.node._id}>
				<RecipeCardContainer
					recipe={e.node}
					previousRecipeId={previousRecipeId}
				/>

				<CardDescription>
					<RecipeName>{recipe && recipe.name}</RecipeName>
					<IconsContainer>
						<Link
							href={{
								pathname: '/recipe-form',
								query: {
									id: e.node._id,
									user: e.node.createdBy.OAuthUniqueAccountId,
									previousRecipeId,
								},
							}}
							as={`/recipe-form/edit`}
						>
							<Icon>
								<FontAwesomeIcon
									icon={editIcon}
									color={'gray'}
									size="1x"
								/>
							</Icon>
						</Link>
						<Icon onClick={() => props.deleteHandler(recipe)}>
							<FontAwesomeIcon
								icon={deleteIcon}
								color={'red'}
								size="1x"
							/>
						</Icon>
					</IconsContainer>
				</CardDescription>
			</CardWrapper>
		);
	});
	return <Container>{recipes}</Container>;
};
