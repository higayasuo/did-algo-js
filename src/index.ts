import * as didResolver from 'did-resolver';
import * as didJwt from 'did-jwt';
import * as didJwtVc from 'did-jwt-vc';

import * as types from './types';
import * as didKey from './didkey';
import * as didKeyDriver from './didkey/didKeyDriver';

/**
 * https://www.w3.org/2018/credentials/v1
 */
export const DEFAULT_CONTEXT = types.DEFAULT_CONTEXT;

/**
 * VerifiableCredential
 */
export const DEFAULT_VC_TYPE = types.DEFAULT_VC_TYPE;

/**
 * VerifiablePresentation
 */
export const DEFAULT_VP_TYPE = types.DEFAULT_VP_TYPE;

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
 * Represents the verification options that can be passed to {@link verifyJWT}
 */
export type VerifyJWTOptions = types.VerifyJWTOptions;

/**
 * the resolver for DID
 */
export const Resolver = didResolver.Resolver;

/**
 * A JWT payload representation of a Credential
 * @see https://www.w3.org/TR/vc-data-model/#jwt-encoding
 */
export type CredentialJWTPayload<T = Record<string, any>> =
  types.CredentialJWTPayload<T>;

/**
 * Represents the creation options that can be passed to {@link createCredentialJWT}
 */
export type CreateCredentialJWTOptions = types.CreateCredentialJWTOptions;

/**
 * Represents the result of a Credential verification.
 * It includes the properties produced by `did-jwt` and a W3C compliant representation of
 * the Credential that was just verified.
 *
 * This is usually the result of a verification method and not meant to be created by generic code.
 */
export type VerifiedCredentialJWT<T> = types.VerifiedCredentialJWT<T>;

/**
 * Represents the verification options that can be passed to {@link verifyCredentialJWT}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VerifyCredentialJWTOptions = types.VerifyCredentialJWTOptions;

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
 *  import { getDIDDriver, JWTPayload, createJWT } from 'did-jwt-toolkit';
 *
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
 *  import { getDIDDriver, JWTPayload, createJWT, Resolver, verifyJWT } from 'did-jwt-toolkit';
 *
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
 *
 *  const resolver = new Resolver(driver.getResolverRegistry());
 *
 *  const verifiedJWT = await verifyJWT(jwt, resolver, {audience: audienceDID});
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

/**
 *  Creates a signed Credential JWT
 *
 *  @example
 *  ```ts
 *  import { getDIDKeyDriver, CredentialJWTPayload, DEFAULT_CONTEXT,
 *    DEFAULT_VC_TYPE, createCredentialJWT } from 'did-jwt-toolkit';
 *
 *  const driver = getDIDKeyDriver('EdDSA');
 *
 *  const issuerKeyPair = driver.generateKeyPair();
 *  const holderKeyPair = driver.generateKeyPair();
 *
 *  const issuer = driver.issuerFromKeyPair(issuerKeyPair);
 *  const holderDID = driver.didFromPublicKey(holderKeyPair.publicKey);
 *
 *  type MyPayload = {
 *    name: string;
 *  };
 *
 *  const payload: CredentialJWTPayload<MyPayload> = {
 *    sub: holderDID,
 *    vc: {
 *      '@context': [DEFAULT_CONTEXT],
 *      type: [DEFAULT_VC_TYPE],
 *      credentialSubject: {
 *        name: 'aaa',
 *      },
 *    },
 *  };
 *
 *  const vcJWT = await createCredentialJWT(payload, issuer);
 *  ```
 *
 *  @param payload - the credential JWT payload
 *  @param issuer - the issuer
 *  @param options - the options
 *  @return a signed credential JWT
 */
export const createCredentialJWT = async (
  payload: CredentialJWTPayload,
  issuer: Issuer,
  options: CreateCredentialJWTOptions = {}
): Promise<string> => {
  return didJwtVc.createVerifiableCredentialJwt(payload, issuer, options);
};

/**
 *  Verifies and validates a VerifiableCredential that is encoded as a JWT according to the W3C spec.
 *
 *  @example
 *  ```ts
 *  import { getDIDDriver, JWTPayload, createJWT, Resolver, verifyJWT,
 *    CredentialJWTPayload, DEFAULT_CONTEXT, DEFAULT_VC_TYPE, createCredentialJWT,
 *    verifyCredentialJWT } from 'did-jwt-toolkit';
 *
 *  const driver = getDIDKeyDriver('EdDSA');
 *
 *  const issuerKeyPair = driver.generateKeyPair();
 *  const holderKeyPair = driver.generateKeyPair();
 *
 *  const issuer = driver.issuerFromKeyPair(issuerKeyPair);
 *  const holderDID = driver.didFromPublicKey(holderKeyPair.publicKey);
 *
 *  type MyPayload = {
 *    name: string;
 *  };
 *
 *  const payload: CredentialJWTPayload<MyPayload> = {
 *    sub: holderDID,
 *    vc: {
 *      '@context': [DEFAULT_CONTEXT],
 *      type: [DEFAULT_VC_TYPE],
 *      credentialSubject: {
 *        name: 'aaa',
 *      },
 *    },
 *  };
 *
 *  const vcJWT = await createCredentialJWT(payload, issuer);
 *
 *  const resolver = new Resolver(driver.getResolverRegistry());
 *
 *  const verifiedVC = await verifyCredentialJWT(vcJWT, resolver);
 *  ```
 *
 *  @param jwt - the JSON Web Token to verify
 *  @param resolver - the resolver for DID
 *  @param options - the options for verifyJWT
 *  @param options.audience - DID of the recipient of the JWT
 *  @return a promise of verified credential JWT
 */
export const verifyCredentialJWT = async <T>(
  vcJWT: string,
  resolver: didResolver.Resolvable,
  options: VerifyCredentialJWTOptions = {}
): Promise<VerifiedCredentialJWT<T>> => {
  return didJwtVc.verifyCredential(vcJWT, resolver, options) as Promise<
    VerifiedCredentialJWT<T>
  >;
};
