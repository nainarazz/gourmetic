import Document, {
	Head,
	Main,
	NextScript,
	NextDocumentContext,
} from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	// tslint:disable-next-line: no-any
	static getInitialProps({ renderPage }: NextDocumentContext) {
		const sheet = new ServerStyleSheet();
		const page = renderPage(App => props =>
			sheet.collectStyles(<App {...props} />)
		);
		const styleTags = sheet.getStyleElement();
		return { ...page, styleTags };
	}

	render() {
		return (
			<html>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
