import * as didjwt from 'did-jwt';

import { AlgName } from './types';
import * as didKey from './didkey';
import * as didKeyDriver from './didkey/didKeyDriver';

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
  algName: AlgName
): didKeyDriver.DIDKeyDriver => {
  return didKey.getDriver(algName);
};

// /**
//  *  Creates a signed JWT
//  *
//  *  @example
//  *  const signer = ES256KSigner(process.env.PRIVATE_KEY)
//  *  createJWT({address: '5A8bRWU3F7j3REx3vkJ...', signer}, {key1: 'value', key2: ..., ... }).then(jwt => {
//  *      ...
//  *  })
//  *
//  *  @param    {Object}            payload               payload object
//  *  @param    {Object}            [options]             an unsigned credential object
//  *  @param    {String}            options.issuer        The DID of the issuer (signer) of JWT
//  *  @param    {String}            options.alg           [DEPRECATED] The JWT signing algorithm to use. Supports:
//  *   [ES256K, ES256K-R, Ed25519, EdDSA], Defaults to: ES256K. Please use `header.alg` to specify the algorithm
//  *  @param    {Signer}            options.signer        a `Signer` function, Please see `ES256KSigner` or `EdDSASigner`
//  *  @param    {boolean}           options.canonicalize  optional flag to canonicalize header and payload before signing
//  *  @param    {Object}            header                optional object to specify or customize the JWT header
//  *  @return   {Promise<Object, Error>}                  a promise which resolves with a signed JSON Web Token or
//  *   rejects with an error
//  */
// export async function createJWT(
//   payload: Partial<JWTPayload>,
//   { issuer, signer, alg, expiresIn, canonicalize }: JWTOptions,
//   header: Partial<JWTHeader> = {}
// ): Promise<string> {
