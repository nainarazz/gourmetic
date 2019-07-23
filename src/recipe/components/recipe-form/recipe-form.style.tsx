import styled from 'styled-components';

export const IngredientsContainer = styled.div``;

export const StyledIngredient = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	input {
		width: 100%;
	}

	@media (min-width: 411px) {
		flex-direction: row;

		.ingredients {
			width: 30%;
		}

		input {
			width: initial;
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
