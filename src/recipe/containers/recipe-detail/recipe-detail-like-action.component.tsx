import React, { FunctionComponent } from 'react';
import { faHeart as heartFilled } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartEmpty } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Recipe } from 'src/recipe/types/recipe.interface';
import { RecipeDetailIcons } from './recipe-detail.styles';
import { useAuth0 } from 'src/authentication/react-auth0-wrapper';

interface RecipeDetailActionsProps {
	likeRecipe: () => void;
	isOptimistic?: boolean;
	recipe: Recipe;
}

const checkIsOptimistic = (isOptimistic: boolean | undefined) =>
	isOptimistic ? 'rgba(255, 0, 0, 0.5)' : 'red';

export const RecipeDetailLikeAction: FunctionComponent<
	RecipeDetailActionsProps
> = props => {
	// tslint:disable:no-any
	const { isAuthenticated, loginWithRedirect }: any = useAuth0();

	return (
		<React.Fragment>
			<RecipeDetailIcons
				onClick={() =>
					isAuthenticated ? props.likeRecipe() : loginWithRedirect()
				}
			>
				<FontAwesomeIcon
					icon={
						props.isOptimistic
							? heartFilled
							: props.recipe.reaction &&
							  props.recipe.reaction.isLiked
							? heartFilled
							: heartEmpty
					}
					color={checkIsOptimistic(props.isOptimistic)}
					size="2x"
				/>
			</RecipeDetailIcons>
		</React.Fragment>
	);
};
