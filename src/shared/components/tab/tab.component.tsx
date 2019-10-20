import React, { SFC } from 'react';
import { StyledTab } from './tab.style';

interface TabProps {
	activeTab: string;
	label: string;
	onClick: (label: string) => void;
}

export const Tab: SFC<TabProps> = props => {
	const { activeTab, label, onClick } = props;

	const onClickHandler = () => onClick(label);
	return (
		<React.Fragment>
			<StyledTab onClick={onClickHandler} activeTab={activeTab === label}>
				{label}
			</StyledTab>
		</React.Fragment>
	);
};
