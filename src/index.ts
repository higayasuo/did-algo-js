import * as didResolver from 'did-resolver';
import * as didJwt from 'did-jwt';

import * as types from './types';
import * as didKey from './didkey';
import * as didKeyDriver from './didkey/didKeyDriver';
import { JwtCredentialPayload } from 'did-jwt-vc';
import { DIDResolver } from 'did-resolver';

export type JWTPayload = types.JWTPayload;

export type JWTOptions = types.JWTOptions;

export type JWTHeader = types.JWTHeader;

export type JWTVerified<T extends didJwt.JWTPayload> = types.JWTVerified<T>;

export type JWTVerifyOptions = types.JWTVerifyOptions;

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
 *  const driver = getDIDKeyDriver('EdDSA');
 *
 *  const issuerKeyPair = driver.generateKeyPair();
 *  const audienceKeyPair = driver.generateKeyPair();
 *
 *  const issuerDID = driver.didFromPublicKey(issuerKeyPair.publicKey);
 *  const audienceDID = driver.didFromPublicKey(audienceKeyPair.publicKey);
 *
 *  const issuerSigner = driver.signerFromSecretKey(issuerKeyPair.secretKey);
 *
 *  type MyPayload = JWTPayload & {
 *    name: string;
 *  };
 *
 *  const payload: MyPayload = {
 *    aud: audienceDID,
 *    name: 'My name',
 *  };
 *  const options: JWTOptions = {
 *    issuer: issuerDID,
 *    signer: issuerSigner
 *  }
 *  const header: JWTHeader = {
 *    alg: 'EdDSA'
 *  }
 *
 *  const jwt = await createJWT(payload, options, header);
 *
 *  @param payload - the JWT payload
 *  @param options - the JWT options
 *  @param header - the JWT header
 *  @return a signed JWT
 */
export const createJWT = async (
  payload: JWTPayload,
  options: JWTOptions,
  header: JWTHeader
): Promise<string> => {
  if (options.canonicalize === undefined) {
    options.canonicalize = true;
  }

  return didJwt.createJWT(payload, options, header);
};

/**
 *  Verifies given JWT. If the JWT is valid, the promise returns an object including the JWT, the payload of the JWT,
 *  and the DID document of the issuer of the JWT.
 *
 *  @example
 *  ```ts
 *  verifyJWT(
 *      'did:uport:eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJyZXF1Z....',
 *      {audience: '5A8bRWU3F7j3REx3vkJ...', callbackUrl: 'https://...'}
 *    ).then(obj => {
 *        const did = obj.did // DID of signer
 *        const payload = obj.payload
 *        const doc = obj.didResolutionResult.didDocument // DID Document of issuer
 *        const jwt = obj.jwt
 *        const signerKeyId = obj.signer.id // ID of key in DID document that signed JWT
 *        ...
 *    })
 *  ```
 *
 *  @param    {String}            jwt                a JSON Web Token to verify
 *  @param    {Object}            [options]           an unsigned credential object
 *  @param    {Boolean}           options.auth        Require signer to be listed in the authentication section of the
 *   DID document (for Authentication purposes)
 *  @param    {String}            options.audience    DID of the recipient of the JWT
 *  @param    {String}            options.callbackUrl callback url in JWT
 *  @return   {Promise<Object, Error>}               a promise which resolves with a response object or rejects with an
 *   error
 */
export const verifyJWT = async <T extends didJwt.JWTPayload>(
  jwt: string,
  options: JWTVerifyOptions
): Promise<JWTVerified<T>> => {
  if (options.policies === undefined) {
    options.policies = {};
  }

  const {
    verified,
    payload: decodedPayload,
    didResolutionResult,
    issuer,
    signer,
    jwt: jwtRet,
    policies,
  } = await didJwt.verifyJWT(jwt, options);

  return {
    verified,
    payload: decodedPayload as T,
    didResolutionResult,
    issuer,
    signer,
    jwt: jwtRet,
    policies,
  };
};
