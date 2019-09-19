import React from 'react';
import { User } from 'src/user/types/user.interface';
import {
	Description,
	RecipeOverview,
	UserPhoto,
} from './recipe-detail-summary.style';

interface RecipeDetailSummaryProps {
	prepTime: number | null | undefined;
	cookTime: number | null | undefined;
	difficulty: string | null | undefined;
	description: string | null | undefined;
	author: User | null | undefined;
	title: string | null | undefined;
}

export const RecipeDetailSummary: React.SFC<
	RecipeDetailSummaryProps
> = props => (
	<React.Fragment>
		<Description>
			<div className="recipe-author">
				<UserPhoto
					src={(props.author && props.author.photo) || undefined}
					round
					size="40"
				/>
				<div>by</div>{' '}
				{props.author &&
					`${props.author.firstname} ${props.author.lastname}`}
			</div>
			<div className="recipe-title">{props.title}</div>
			<div className="description">{props.description}</div>
		</Description>
		<RecipeOverview>
			<div className="item">
				<h4 className="title">Prep time</h4>
				<div className="value">{props.prepTime} min</div>
			</div>
			<div className="item">
				<h4 className="title">Cook time</h4>
				<div className="value">{props.cookTime} min</div>
			</div>
			<div className="item">
				<h4 className="title">Difficulty</h4>
				<div className="value">{props.difficulty}</div>
			</div>
		</RecipeOverview>
	</React.Fragment>
);
