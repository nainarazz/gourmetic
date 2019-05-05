import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Document, {
	Head,
	Main,
	NextScript,
	NextDocumentContext,
} from 'next/document';

interface DocumentProps {
	styleTags: string;
}

export default class MyDocument extends Document<DocumentProps> {
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
				<Head>{this.props.styleTags}</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
