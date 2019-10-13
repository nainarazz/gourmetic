import React, { SFC, useState } from 'react';
import { Tab } from '../tab/tab.component';
import { TabContent, TabList } from './tabs.style';

export const Tabs: SFC = props => {
	const children = React.Children.toArray(props.children);
	// tslint:disable-next-line:no-any
	const childLabel = children && (children as any[])[0].props.label;
	const [activeTab, setActiveTab] = useState(childLabel);

	const onClickTabItem = (tab: string) => setActiveTab(tab);

	// tslint:disable:no-any
	return (
		<React.Fragment>
			<TabList>
				{children &&
					(children as any[]).map(child => {
						const { label } = child.props;
						return (
							<Tab
								key={label}
								activeTab={activeTab}
								label={label}
								onClick={onClickTabItem}
							/>
						);
					})}
			</TabList>
			<TabContent>
				{children &&
					(children as any[]).map(child => {
						if (child.props && child.props.label !== activeTab) {
							return undefined;
						}
						return child.props.children;
					})}
			</TabContent>
		</React.Fragment>
	);
};
