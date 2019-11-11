import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import { faEdit as editIcon } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RecipeDetailIcons } from './recipe-detail.styles';
import { useAuth0 } from 'src/authentication/react-auth0-wrapper';

interface RecipeDetailEditProps {
	recipeId: string;
	userId: string;
	createdBy: string;
}

export const RecipeDetailEditAction: FunctionComponent<
	RecipeDetailEditProps
> = props => {
	// tslint:disable:no-any
	const { isAuthenticated }: any = useAuth0();

	const editIconShown = isAuthenticated && props.userId === props.createdBy;
	return (
		<React.Fragment>
			{editIconShown && (
				<RecipeDetailIcons>
					<Link
						href={{
							pathname: '/recipe-form',
							query: {
								id: props.recipeId,
								user: props.userId,
							},
						}}
						as={`/recipe-form/edit`}
					>
						<FontAwesomeIcon
							icon={editIcon}
							color={'gray'}
							size="2x"
						/>
					</Link>
				</RecipeDetailIcons>
			)}
		</React.Fragment>
	);
};
