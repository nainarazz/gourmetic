import React from 'react';
import { themeColor } from 'src/shared/themes/colors';
import { User } from 'src/user/types/user.interface';
import {
	RecipeInfo,
	AdditionalInfo,
	UserPhoto,
	RecipeAuthorContainer,
	AuthorName,
	RecipeTitle,
	Description,
	SubHeader,
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
		<RecipeInfo>
			<RecipeAuthorContainer>
				<UserPhoto
					src={(props.author && props.author.photo) || undefined}
					round
					size="40"
				/>
				<AuthorName>
					<i
						style={{
							color: themeColor.lightShadeSecondary,
							fontWeight: 500,
							marginRight: '10px',
						}}
					>
						by
					</i>
					{props.author &&
						` ${props.author.firstname} ${props.author.lastname}`}
				</AuthorName>
			</RecipeAuthorContainer>
			<RecipeTitle>{props.title}</RecipeTitle>
			<Description>{props.description}</Description>
		</RecipeInfo>
		<AdditionalInfo>
			<SubHeader>
				<h4 className="title">Prep time</h4>
				<div className="value">
					{props.prepTime ? `${props.prepTime} min` : ''}
				</div>
			</SubHeader>
			<SubHeader>
				<h4 className="title">Cook time</h4>
				<div className="value">
					{props.cookTime ? `${props.cookTime} min` : ''}
				</div>
			</SubHeader>
			<SubHeader>
				<h4 className="title">Difficulty</h4>
				<div className="value">
					{props.difficulty && props.difficulty.toLowerCase()}
				</div>
			</SubHeader>
		</AdditionalInfo>
	</React.Fragment>
);
