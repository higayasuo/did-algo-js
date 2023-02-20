import * as didJwt from 'did-jwt';
import * as didJwtVc from 'did-jwt-vc';
import * as didResolver from 'did-resolver';

import * as types from '../types';
import * as didResolverImpl from './didResolverImpl';

/**
 * Converts the base58btc multibase to a DID
 *
 * @param multibase - the base58btc multibase
 * @returns a DID
 */
export const didFromMultibase = (multibase: string) => {
  return `did:key:${multibase}`;
};

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
    return didFromMultibase(this.#alg.multibaseFromPublicKey(publicKey));
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
   * Converts the key pair to an issuer
   *
   * @param keyPair - the key pair
   * @returns an issuer
   */
  issuerFromKeyPair = (keyPair: types.KeyPair): didJwtVc.Issuer => {
    return this.#alg.issuerFromKeyPair(keyPair);
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
