import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Document, {
	Head,
	Main,
	NextScript,
	NextDocumentContext,
	Html,
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
			<Html>
				<Head>
					{this.props.styleTags}
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
					<link rel="manifest" href="/static/manifest.json" />
					<link
						href="https://fonts.googleapis.com/css?family=Roboto:400,500,900&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
