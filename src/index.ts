import * as didResolver from 'did-resolver';
import * as didJwt from 'did-jwt';

import * as types from './types';
import * as didKey from './didkey';
import * as didKeyDriver from './didkey/didKeyDriver';

/**
 * the JWT payload
 */
export type JWTPayload = types.JWTPayload;

/**
 * the options for {@link createJWT}
 */
export type CreateJWTOptions = types.CreateJWTOptions;

/**
 * the issuer
 */
export type Issuer = types.Issuer;

/**
 * the verified JWT
 */
export type VerifiedJWT<T> = types.VerifiedJWT<T>;

/**
 * the options for {@link verifyJWT}
 */
export type VerifyJWTOptions = types.VerifyJWTOptions;

/**
 * the resolver for DID
 */
export const Resolver = didResolver.Resolver;

/**
 * Returns the did:key driver
 *
 * @example
 * const driver = getDIDKeyDriver('EdDSA');
 *
 * @param algName - "EdDSA", "ES256K" or "ES256"
 * @returns the did:key driver
 */
export const getDIDKeyDriver = (
  algName: types.AlgName
): didKeyDriver.DIDKeyDriver => {
  return didKey.getDriver(algName);
};

/**
 *  Creates a signed JWT
 *
 *  @example
 *  ```ts
 *  const driver = getDIDKeyDriver('EdDSA');
 *
 *  const issuerKeyPair = driver.generateKeyPair();
 *  const audienceKeyPair = driver.generateKeyPair();
 *
 *  const issuer = driver.issuerFromKeyPair(issuerKeyPair);
 *  const audienceDID = driver.didFromPublicKey(audienceKeyPair.publicKey);
 *
 *  type MyPayload = {
 *    name: string;
 *  };
 *
 *  const payload: JWTPayload & MyPayload = {
 *    aud: audienceDID,
 *    name: 'My name',
 *  };
 *
 *  const jwt = await createJWT(payload, issuer);
 *  ```
 *
 *  @param payload - the JWT payload
 *  @param issuer - the issuer
 *  @param options - the JWT options
 *  @return a signed JWT
 */
export const createJWT = async (
  payload: JWTPayload,
  issuer: Issuer,
  options: CreateJWTOptions = {}
): Promise<string> => {
  const jwtOptions: didJwt.JWTOptions = {
    issuer: issuer.did,
    signer: issuer.signer,
    expiresIn: options.expiresIn,
    canonicalize: options.canonicalize,
  };
  const jwtHeader: types.JWTHeader = options.header || {};

  jwtHeader.alg = issuer.alg;

  return didJwt.createJWT(payload, jwtOptions, jwtHeader);
};

/**
 *  Verifies given JWT. If the JWT is valid, the promise returns an object including the JWT, the payload of the JWT,
 *  and the DID document of the issuer of the JWT.
 *
 *  @example
 *  ```ts
 *  const resolver = new Resolver(driver.getResolverRegistry());
 *
 *  const verifiedJWT = verifyJWT(jwt, resolver, {audience: audienceDID});
 *  );
 *  ```
 *
 *  @param jwt - the JSON Web Token to verify
 *  @param resolver - the resolver for DID
 *  @param options - the options for verifyJWT
 *  @param options.audience - DID of the recipient of the JWT
 *  @return a promise of verified JWT
 */
export const verifyJWT = async <T>(
  jwt: string,
  resolver: didResolver.Resolvable,
  options: VerifyJWTOptions = {}
): Promise<VerifiedJWT<T>> => {
  if (options.policies === undefined) {
    options.policies = {};
  }

  options.resolver = resolver;

  return didJwt.verifyJWT(jwt, options) as Promise<VerifiedJWT<T>>;
};
