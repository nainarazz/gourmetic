import Link from 'next/link';
import React from 'react';
import { faHeart as heartFilled } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartEmpty } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Recipe } from '../../../graphql-generated-types/query-types';
import {
	CardDescription,
	ImageWrapper,
	LoveIcon,
	Photo,
	Likes,
} from './recipe-card.style';

interface RecipeCardProps {
	recipe: Recipe;
	totalLikes: number;
	username: string;
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
				<ImageWrapper>
					<Photo>
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
						<Likes>
							<span>{props.totalLikes} Likes</span>
						</Likes>
					</Photo>
					<CardDescription>
						<div>{props.recipe && props.recipe.name}</div>
						<div>{props.username}</div>
					</CardDescription>
				</ImageWrapper>
			</Link>
		</React.Fragment>
	);
};
