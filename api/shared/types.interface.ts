interface Auth0DecodedTokenResponse {
	sub: string;
	aud: string[];
	iat: number;
	exp: number;
	azp: string;
	scope: string;
}
