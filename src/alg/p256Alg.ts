import * as elliptic from 'elliptic';
import * as didResolver from 'did-resolver';
import * as didJwt from 'did-jwt';

import * as types from '../types';
import * as multibaseUtils from '../utils/multibaseUtils';
import * as ecdsaUtils from '../utils/ecdsaUtils';

const p256 = new elliptic.ec('p256');

export const p256Alg: types.Alg = {
  /**
   * Generates a key pair
   *
   * @returns a key pair
   */
  generateKeyPair: (): types.KeyPair => {
    return ecdsaUtils.generateKeyPair(p256);
  },

  /**
   * Converts the secret key to a key pair
   *
   * @param secretKey - the secret key
   * @returns a key pair
   */
  keyPairFromSecretKey: (secretKey: Uint8Array): types.KeyPair => {
    return ecdsaUtils.keyPairFromSecretKey(p256, secretKey);
  },

  /**
   * Converts the public key to a base58btc multibase
   *
   * @param publicKey - the public key
   * @returns a base58btc multibase
   */
  multibaseFromPublicKey: (publicKey: Uint8Array): string => {
    return multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_P256_PUB_HEADER,
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
      multibaseUtils.MULTICODEC_P256_PUB_HEADER,
      multibase
    );
  },

  /**
   * Creates a signer from the secret key
   *
   * @param secretKey - the secret key
   * @returns a signer
   */
  signerFromSecretKey: (secretKey: Uint8Array): didJwt.Signer => {
    return didJwt.ES256Signer(secretKey);
  },

  /**
   * Creates a publicKeyJWK object from the public key
   *
   * @param publicKey - the public key
   * @returns a publicKeyJwk object
   */
  publicKeyJwkFromPublicKey: (
    publicKey: Uint8Array
  ): didResolver.JsonWebKey => {
    const { x, y } = ecdsaUtils.xyFromPublicKey(p256, publicKey);

    return {
      kty: 'EC',
      crv: 'P-256',
      x,
      y,
    };
  },
};
