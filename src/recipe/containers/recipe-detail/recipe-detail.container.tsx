import React from 'react';
import { Image, RecipeDetailWrapper } from './recipe-detail.styles';
import { Ingredient } from '../../components/ingredients/ingredient.component';
import { Instruction } from '../../components/instructions/instruction.component';
import { NextFunctionComponent } from 'next';
import { RecipeDetailSummary } from '../../components/recipe-summary/recipe-detail-summary.component';
import {
	RecipeDetailComponent,
	Instruction as IInstruction,
} from '../../../graphql-generated-types/query-types';

interface RecipeDetailProps {
	id: string;
}

export const RecipeDetailRoot: NextFunctionComponent<
	RecipeDetailProps
> = props => (
	<RecipeDetailComponent variables={{ id: props.id }}>
		{({ data }) => {
			const recipe = data && data.recipeDetail;
			const authorResult = recipe && recipe.createdBy;
			const author =
				authorResult &&
				`${authorResult.firstname} ${authorResult.lastname}`;
			const instructions =
				recipe && recipe.instructions ? recipe.instructions : [];

			return (
				<React.Fragment>
					<RecipeDetailWrapper>
						<Image imageUrl={(recipe && recipe.image) || ''} />
						<RecipeDetailSummary
							prepTime={recipe && recipe.prepTime}
							difficulty={'easy'}
							cookTime={recipe && recipe.prepTime}
							description={(recipe && recipe.description) || ''}
							author={author}
							title={recipe && recipe.name}
						/>
						<Ingredient
							ingredients={(recipe && recipe.ingredients) || []}
						/>
						<Instruction
							instructions={instructions as IInstruction[]}
						/>
					</RecipeDetailWrapper>
				</React.Fragment>
			);
		}}
	</RecipeDetailComponent>
);
