import * as ed25519 from '@stablelib/ed25519';
import * as didResolver from 'did-resolver';
import * as didJwt from 'did-jwt';
import * as u8a from 'uint8arrays';

import * as types from '../types';
import * as multibaseUtils from '../utils/multibaseUtils';

export const ed25519Alg: types.Alg = {
  /**
   * Generates a key pair
   *
   * @returns a key pair
   */
  generateKeyPair: ed25519.generateKeyPair,

  /**
   * Converts the secret key to a key pair
   *
   * @param secretKey - the secret key
   * @returns a key pair
   */
  keyPairFromSecretKey: (secretKey: Uint8Array): types.KeyPair => {
    return {
      publicKey: secretKey.slice(32),
      secretKey,
    };
  },

  /**
   * Converts the public key to a base58btc multibase
   *
   * @param publicKey - the public key
   * @returns a base58btc multibase
   */
  multibaseFromPublicKey: (publicKey: Uint8Array): string => {
    return multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_ED25519_PUB_HEADER,
      publicKey
    );
  },

  /**
   * Converts the base58btc multibase to a public key
   *
   * @param multibase - the base58btc multibase
   * @returns a public key
   */
  publicKeyFromMultibase: (multibase: string): Uint8Array => {
    return multibaseUtils.publicKeyFromMultibase(
      multibaseUtils.MULTICODEC_ED25519_PUB_HEADER,
      multibase
    );
  },

  /**
   * Creates a signer from the secret key
   *
   * @param secretKey
   * @returns a signer
   */
  signerFromSecretKey: (secretKey: Uint8Array): didJwt.Signer => {
    return didJwt.EdDSASigner(secretKey);
  },

  /**
   * Creates a publicKeyJWK object from the public key
   *
   * @param publicKey
   * @returns a publicKeyJwk object
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
