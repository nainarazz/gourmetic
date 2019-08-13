import styled from 'styled-components';

export const IngredientsContainer = styled.div``;

export const StyledIngredient = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	@media (min-width: 1200px) {
		flex-direction: row;

		.ingredients {
			width: 30%;
		}
	}
`;

export const InstructionsContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const StyledInstruction = styled.div`
	display: flex;
`;
