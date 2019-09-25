import styled from 'styled-components';

interface StyledTabProps {
	activeTab: boolean;
}

export const StyledTab = styled.div`
	border-bottom: ${(props: StyledTabProps) =>
		props.activeTab ? '1px solid purple' : ''};
`;
