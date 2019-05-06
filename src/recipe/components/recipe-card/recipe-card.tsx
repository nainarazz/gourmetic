import React from 'react';
import { faHeart as heartFilled } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	CardDescription,
	ImageWrapper,
	LoveIcon,
	Photo,
	Likes,
} from './styles';

export const RecipeCard: React.SFC = () => {
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
						<span>15 Likes</span>
					</Likes>
				</Photo>
				<CardDescription>
					<div>Recipe Name</div>
					<div>Username</div>
				</CardDescription>
			</ImageWrapper>
		</React.Fragment>
	);
};
