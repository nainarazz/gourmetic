import Link from 'next/link';
import React from 'react';
import { DEFAULT_IMAGE_PLACEHOLDER_PUBLIC_ID } from '../../constants/recipe.constants';
import { faHeart as heartFilled } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartEmpty } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from 'cloudinary-react';
import { ImageWrapper, LoveIcon, StyledCard } from './recipe-card.style';
import { Recipe } from '../../types/recipe.interface';

interface RecipeCardProps {
	recipe: Recipe;
	totalLikes: number;
	isOptimistic?: boolean;
	likeRecipe: () => void;
}

const checkIsOptimistic = (isOptimistic: boolean | undefined, recipe: Recipe) =>
	isOptimistic ? 'rgba(255, 0, 0, 0.5)' : 'red';

export const RecipeCard: React.SFC<RecipeCardProps> = props => {
	const recipeLikedByUser =
		props.recipe.reaction && props.recipe.reaction.isLiked;

	const likeRecipe = (e: React.MouseEvent) => {
		e.stopPropagation();
		// perform action to insert like in database
		props.likeRecipe();
	};

	return (
		<React.Fragment>
			<Link
				href={`/recipe?id=${props.recipe._id}`}
				as={`/recipe/${props.recipe._id}`}
			>
				<StyledCard>
					<ImageWrapper>
						<Image
							cloudName="gourmetic"
							dpr="auto"
							responsive
							width="auto"
							height="320"
							quality="auto"
							crop="scale"
							client_hints="true"
							publicId={
								props.recipe.image.publicId ||
								DEFAULT_IMAGE_PLACEHOLDER_PUBLIC_ID
							}
						/>
						<LoveIcon onClick={likeRecipe}>
							<FontAwesomeIcon
								icon={
									props.isOptimistic
										? heartFilled
										: recipeLikedByUser
										? heartFilled
										: heartEmpty
								}
								color={checkIsOptimistic(
									props.isOptimistic,
									props.recipe
								)}
								size="2x"
							/>
						</LoveIcon>
					</ImageWrapper>
				</StyledCard>
			</Link>
		</React.Fragment>
	);
};
