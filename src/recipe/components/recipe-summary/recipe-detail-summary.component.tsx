import React from 'react';
import { Description, RecipeOverview } from './recipe-detail-summary.style';

interface RecipeDetailSummaryProps {
	prepTime: string;
	cookTime: string;
	difficulty: string;
	description: string;
	author: string;
	title: string;
}

export const RecipeDetailSummary: React.SFC<
	RecipeDetailSummaryProps
> = props => (
	<React.Fragment>
		<Description>
			<div className="recipe-author">
				<div>by</div> {props.author}
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
