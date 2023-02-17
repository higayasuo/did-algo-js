import * as didJwt from 'did-jwt';

import * as didResolver from 'did-resolver';

import * as types from '../types';
import * as didResolverImpl from './didResolverImpl';

/**
 * The driver for did:key
 */
export class DIDKeyDriver {
  #alg: types.Alg;

  /**
   * Constructor
   * @param alg the crypto algorithm
   */
  constructor(alg: types.Alg) {
    this.#alg = alg;
  }

  /**
   * Generates a key pair
   *
   * @returns a key pair
   */
  generateKeyPair(): types.KeyPair {
    return this.#alg.generateKeyPair();
  }

  /**
   * Converts the secret key to a key pair
   *
   * @param secretKey - the secret key
   * @returns a key pair
   */
  keyPairFromSecretKey(secretKey: Uint8Array): types.KeyPair {
    return this.#alg.keyPairFromSecretKey(secretKey);
  }

  /**
   * Converts the public key to a DID
   *
   * @param publicKey - the public key
   * @returns a DID
   */
  didFromPublicKey = (publicKey: Uint8Array): string => {
    return `did:key:${this.#alg.multibaseFromPublicKey(publicKey)}`;
  };

  /**
   * Converts the secret key to a signer
   *
   * @param secretKey - the secret key
   * @returns a signer
   */
  signerFromSecretKey = (secretKey: Uint8Array): didJwt.Signer => {
    return this.#alg.signerFromSecretKey(secretKey);
  };

  /**
   * Returns a resolver registry for did:key
   *
   * @returns a resolver registry for did:key
   */
  getResolverRegistry = (): didResolver.ResolverRegistry => {
    return { key: didResolverImpl.resolver };
  };
}
