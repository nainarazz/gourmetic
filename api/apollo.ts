import * as depthLimit from 'graphql-depth-limit';
import * as jsonWebToken from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import * as mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { buildDataLoaders } from './shared/create-loader';
import { config } from '../src/authentication/auth-config';
import { Context, DataLoaderType } from './graphql-generated-types/context';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { schema } from './schema';

const client = jwksClient({
	jwksUri: `https://${config.domain}/.well-known/jwks.json`,
	rateLimit: true,
	jwksRequestsPerMinute: 5,
	cache: true,
});

// tslint:disable-next-line:no-any
const getKey = (header: any, cb: any) => {
	client.getSigningKey(header.kid, (err, key: jwksClient.SigningKey) => {
		const signingKey =
			(key as jwksClient.CertSigningKey).publicKey ||
			(key as jwksClient.RsaSigningKey).rsaPublicKey;
		cb(null, signingKey);
	});
};

const options = {
	audience: config.audience,
	issuer: `https://${config.domain}/`,
	algorithms: ['RS256'],
};

// tslint:disable:no-any
const getDecodedToken = (
	token: string,
	key: any,
	option: any
): Promise<JwtTokenClaims> => {
	return new Promise((resolve, reject) => {
		jsonWebToken.verify(
			token,
			key,
			option,
			// tslint:disable-next-line:no-any
			(err, decoded: any) => {
				if (err) {
					reject(err);
				}
				resolve(decoded);
			}
		);
	});
};

export const createApolloServer = (
	db: typeof mongoose | undefined
): ApolloServer => {
	return new ApolloServer({
		schema,
		context: async ({ req }: ExpressContext): Promise<Context> => {
			const token = req.headers.authorization
				? req.headers.authorization.split(' ')[1]
				: '';
			let jwtTokenClaims: JwtTokenClaims | null = null;
			if (token) {
				jwtTokenClaims = await getDecodedToken(token, getKey, options);
			}

			return {
				db,
				loaders: buildDataLoaders() as DataLoaderType,
				jwtTokenClaims,
			};
		},
		validationRules: [depthLimit(10)],
	});
};
