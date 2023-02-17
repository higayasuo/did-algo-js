import * as didJwt from 'did-jwt';

import * as types from './types';
import * as didKey from './didkey';
import * as didKeyDriver from './didkey/didKeyDriver';

export type JWTPayload = types.JWTPayload;

export type JWTOptions = types.JWTOptions;

export type JWTHeader = types.JWTHeader;

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
