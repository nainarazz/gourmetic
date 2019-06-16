import Link from 'next/link';
import React from 'react';
import { faHeart as heartFilled } from '@fortawesome/free-solid-svg-icons';
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
}

export const RecipeCard: React.SFC<RecipeCardProps> = props => {
	return (
		<React.Fragment>
			<Link
				href={`/recipe?id=${props.recipe._id}`}
				as={`/recipe/${props.recipe._id}`}
			>
				<ImageWrapper>
					<Photo>
						<LoveIcon>
							<FontAwesomeIcon
								icon={heartFilled}
								color="red"
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
