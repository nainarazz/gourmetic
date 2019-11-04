import React from 'react';
import { AppLayout } from 'src/layout/containers/app-layout/app-layout.container';
import { NextFunctionComponent } from 'next';
import { SearchResultContainer } from 'src/search/containers/search-result/search-result.container';

const SearchResultPage: NextFunctionComponent = () => {
	return (
		<React.Fragment>
			<AppLayout>
				<SearchResultContainer />
			</AppLayout>
		</React.Fragment>
	);
};

export default SearchResultPage;
