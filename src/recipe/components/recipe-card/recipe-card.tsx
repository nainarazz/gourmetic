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
} from './styles';

interface RecipeCardProps {
	recipe: Recipe;
	totalLikes: number;
	username: string;
}

export const RecipeCard: React.SFC<RecipeCardProps> = props => {
	return (
		<React.Fragment>
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
		</React.Fragment>
	);
};
