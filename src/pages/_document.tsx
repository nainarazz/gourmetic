import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Document, {
	Head,
	Main,
	NextScript,
	NextDocumentContext,
} from 'next/document';

export default class MyDocument extends Document {
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
