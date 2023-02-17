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
   * Generates the key pair
   *
   * @returns the key pair
   */
  generateKeyPair(): types.KeyPair {
    return this.#alg.generateKeyPair();
  }

  /**
   * Converts the secret key to the key pair
   *
   * @param secretKey - the secret key
   * @returns the key pair
   */
  keyPairFromSecretKey(secretKey: Uint8Array): types.KeyPair {
    return this.#alg.keyPairFromSecretKey(secretKey);
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

  getResolverRegistry = (): didResolver.ResolverRegistry => {
    return { key: didResolverImpl.resolver };
  };
}
