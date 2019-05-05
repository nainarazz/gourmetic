import React from 'react';
import { CardDescription, ImageWrapper, Photo } from './styles';

export const RecipeCard: React.SFC = () => {
	return (
		<React.Fragment>
			<ImageWrapper>
				<Photo />
				<CardDescription />
			</ImageWrapper>
		</React.Fragment>
	);
};
