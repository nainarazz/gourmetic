import styled from 'styled-components';
import { themeColor } from 'src/shared/themes/colors';

interface StyledTabProps {
	activeTab: boolean;
}

export const StyledTab = styled.div`
	width: 100%;
	padding: 15px 0;
	color: ${(props: StyledTabProps) =>
		props.activeTab ? themeColor.purple : 'lightgrey'};
	border-bottom: ${(props: StyledTabProps) =>
		props.activeTab ? `3px solid ${themeColor.purple}` : ''};
	background-color: rgba(211, 211, 211, 0.01);

	:hover {
		cursor: pointer;
		background-color: rgba(211, 211, 211, 0.05);
		color: ${themeColor.purple};
	}
`;
