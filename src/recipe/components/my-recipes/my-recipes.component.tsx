import Link from 'next/link';
import React, { FunctionComponent, useState } from 'react';
import { ConfirmationModal } from 'src/shared/components/modal/confirmation-modal/confirmation-modal.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Recipe, RecipeEdge } from 'src/recipe/types/recipe.interface';
import { RecipeCardContainer } from 'src/recipe/containers/recipe-card/recipe-card.container';
import { useModal } from 'src/shared/components/modal/use-modal';
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
	EmptyRecipeList,
} from './my-recipes.styles';

interface RecipeListProps {
	recipeEdges: RecipeEdge[];
	deleteHandler: (recipe: Recipe) => void;
}

export const MyRecipes: FunctionComponent<RecipeListProps> = props => {
	if (!props.recipeEdges) {
		return null;
	}
	const { isShown, toggle } = useModal();
	const [recipeToDelete, setRecipeToDelete] = useState();

	const recipes =
		props.recipeEdges.length < 1 ? (
			<EmptyRecipeList>No recipes found.</EmptyRecipeList>
		) : (
			props.recipeEdges.map((e, i) => {
				const previousRecipeId =
					(props.recipeEdges[i - 1] &&
						props.recipeEdges[i - 1].node._id) ||
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
											user:
												e.node.createdBy
													.OAuthUniqueAccountId,
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
								<Icon
									onClick={() => {
										setRecipeToDelete(recipe);
										toggle();
									}}
								>
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
			})
		);

	return (
		<Container>
			{recipes}
			<ConfirmationModal
				isShown={isShown}
				hide={toggle}
				onConfirm={() => {
					props.deleteHandler(recipeToDelete);
					toggle();
				}}
				onCancel={toggle}
			/>
		</Container>
	);
};
