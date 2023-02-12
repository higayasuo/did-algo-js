import * as ed25519 from '@stablelib/ed25519';
import * as didResolver from 'did-resolver';
import * as didJwt from 'did-jwt';
import * as u8a from 'uint8arrays';

import * as types from '../types';
import * as multibaseUtils from '../utils/multibaseUtils';

export const ed25519Alg: types.Alg = {
  /**
   * Generates the key pair
   *
   * @returns the key pair
   */
  generateKeyPair: ed25519.generateKeyPair,

  /**
   * Converts the public key to the base58btc multibase
   *
   * @param publicKey - the public key
   * @returns the base58btc multibase
   */
  multibaseFromPublicKey: (publicKey: Uint8Array): string => {
    return multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_ED25519_PUB_HEADER,
      publicKey
    );
  },

  /**
   * Converts the base58btc multibase to the public key
   *
   * @param multibase - the base58btc multibase
   * @returns the public key
   */
  publicKeyFromMultibase: (multibase: string): Uint8Array => {
    return multibaseUtils.publicKeyFromMultibase(
      multibaseUtils.MULTICODEC_ED25519_PUB_HEADER,
      multibase
    );
  },

  /**
   * Creates the signer from the secret key
   *
   * @param secretKey
   * @returns the signer
   */
  signerFromSecretKey: (secretKey: Uint8Array): didJwt.Signer => {
    return didJwt.EdDSASigner(secretKey);
  },

  /**
   * Creates the publicKeyJWK object from the public key
   *
   * @param publicKey
   * @returns the publicKeyJwk object
   */
  publicKeyJwkFromPublicKey: (
    publicKey: Uint8Array
  ): didResolver.JsonWebKey => {
    const x = u8a.toString(publicKey, 'base64url');

    return {
      kty: 'OKP',
      crv: 'Ed25519',
      x,
    };
  },
};
