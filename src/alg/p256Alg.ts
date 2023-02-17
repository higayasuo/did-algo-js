import * as elliptic from 'elliptic';
import * as didResolver from 'did-resolver';
import * as didJwt from 'did-jwt';

import * as types from '../types';
import * as multibaseUtils from '../utils/multibaseUtils';
import * as ecdsaUtils from '../utils/ecdsaUtils';

const p256 = new elliptic.ec('p256');

export const p256Alg: types.Alg = {
  /**
   * Generates the key pair
   *
   * @returns the key pair
   */
  generateKeyPair: (): types.KeyPair => {
    return ecdsaUtils.generateKeyPair(p256);
  },

  /**
   * Converts the secret key to the key pair
   *
   * @param secretKey - the secret key
   * @returns the key pair
   */
  keyPairFromSecretKey: (secretKey: Uint8Array): types.KeyPair => {
    return ecdsaUtils.keyPairFromSecretKey(p256, secretKey);
  },

  /**
   * Converts the public key to the base58btc multibase
   *
   * @param publicKey - the public key
   * @returns the base58btc multibase
   */
  multibaseFromPublicKey: (publicKey: Uint8Array): string => {
    return multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_P256_PUB_HEADER,
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
      multibaseUtils.MULTICODEC_P256_PUB_HEADER,
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
    return didJwt.ES256Signer(secretKey);
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
    const { x, y } = ecdsaUtils.xyFromPublicKey(p256, publicKey);

    return {
      kty: 'EC',
      crv: 'P-256',
      x,
      y,
    };
  },
};
