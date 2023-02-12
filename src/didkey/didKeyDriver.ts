import * as didJwt from 'did-jwt';
import * as didResolver from 'did-resolver';

import * as didResolverUtils from '../utils/didResolverUtils';
import * as errors from '../errors';
import * as types from '../types';

/**
 * The driver for did:key
 */
export class DidKeyDriver {
  #alg: types.Alg;

  /**
   * Constructor
   * @param alg the crypto algorithm
   */
  constructor(alg: types.Alg) {
    this.#alg = alg;
  }

  /**
   * Generates the key pair
   *
   * @returns the key pair
   */
  generateKeyPair(): types.KeyPair {
    return this.#alg.generateKeyPair();
  }

  /**
   * Converts the public key to DID
   *
   * @param publicKey - the public key
   * @returns DID
   */
  didFromPublicKey = (publicKey: Uint8Array): string => {
    return `did:key:${this.#alg.multibaseFromPublicKey(publicKey)}`;
  };

  /**
   * Converts the secret key to the signer
   *
   * @param secretKey - the secret key
   * @returns the signer
   */
  signerFromSecretKey = (secretKey: Uint8Array): didJwt.Signer => {
    return this.#alg.signerFromSecretKey(secretKey);
  };
}

/**
 * the did resolver function
 *
 * @param did - the DID
 * @param parsed the parsed DID
 * @param resolver the resolver
 * @param options the resolver options
 * @returns the DID resolution result
 */
export const resolver: didResolver.DIDResolver = async (
  did,
  parsed,
  resolver,
  options
): Promise<didResolver.DIDResolutionResult> => {};
