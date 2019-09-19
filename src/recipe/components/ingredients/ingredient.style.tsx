import styled from 'styled-components';
import { ButtonText, PlusRoundButton } from '../../../shared/styles/buttons';
import { GenericInputContainer } from '../../../shared/styles/forms';
import { themeColor } from '../../../shared/themes/colors';

export const IngredientsWrapper = styled.div`
	width: 90%;
	margin: auto;
	padding: 15px 0;
`;

export const Title = styled.div`
	font-size: 1.3rem;
`;

export const Contents = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const Item = styled.div`
	width: calc(50% - 3rem);
	padding: 15px 5px;
	text-align: center;
	border-bottom: 1px solid lightgrey;
	margin: 1rem;
`;

export const ItemIndex = styled.span`
	color: ${themeColor.secondary};
	font-weight: 900;
	margin-left: 10px;
	font-size: 0.9rem;
`;

export const StyledIngredient = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	@media (min-width: 768px) {
		flex-direction: row;
	}
`;

export const QuantityInputContainer = styled(GenericInputContainer)`
	width: 100%;
	flex-direction: column;
	@media (min-width: 768px) {
		width: 10%;
	}
`;

export const MeasurementInputContainer = styled(GenericInputContainer)`
	width: 100%;
	flex-direction: column;
	@media (min-width: 768px) {
		width: 20%;
	}
`;

export const AddButtonSmallScreen = styled(ButtonText)`
	margin: 0;
	width: 100%;
	display: block;

	@media (min-width: 768px) {
		display: none;
	}
`;

export const AddButtonLargeScreen = styled(PlusRoundButton)`
	display: none;

	@media (min-width: 768px) {
		display: block;
	}
`;
