import elliptic from 'elliptic';
import * as didResolver from 'did-resolver';
import * as didJwt from 'did-jwt';
import * as didJwtVc from 'did-jwt-vc';

import * as types from '../types';
import * as multibaseUtils from '../utils/multibaseUtils';
import * as ecdsaUtils from '../utils/ecdsaUtils';
import * as didKeyDriver from '../didkey/didKeyDriver';

const secp256k1 = new elliptic.ec('secp256k1');

export const secp256k1Alg: types.Alg = {
  /**
   * Generates a key pair
   *
   * @returns a key pair
   */
  generateKeyPair: (): types.KeyPair => {
    return ecdsaUtils.generateKeyPair(secp256k1);
  },

  /**
   * Converts the secret key to a key pair
   *
   * @param secretKey - the secret key
   * @returns a key pair
   */
  keyPairFromSecretKey: (secretKey: Uint8Array): types.KeyPair => {
    return ecdsaUtils.keyPairFromSecretKey(secp256k1, secretKey);
  },

  /**
   * Converts the public key to a base58btc multibase
   *
   * @param publicKey - the public key
   * @returns a base58btc multibase
   */
  multibaseFromPublicKey: (publicKey: Uint8Array): string => {
    return multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_SECP256K1_PUB_HEADER,
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
      multibaseUtils.MULTICODEC_SECP256K1_PUB_HEADER,
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
    return didJwt.ES256KSigner(secretKey);
  },

  /**
   * Converts the key pair to an issuer
   *
   * @param keyPair - the key pair
   * @returns an issuer
   */
  issuerFromKeyPair: (keyPair: types.KeyPair): didJwtVc.Issuer => {
    return {
      did: didKeyDriver.didFromMultibase(
        secp256k1Alg.multibaseFromPublicKey(keyPair.publicKey)
      ),
      signer: secp256k1Alg.signerFromSecretKey(keyPair.secretKey),
      alg: 'ES256K',
    };
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
    const { x, y } = ecdsaUtils.xyFromPublicKey(secp256k1, publicKey);

    return {
      kty: 'EC',
      crv: 'secp256k1',
      x,
      y,
    };
  },
};
