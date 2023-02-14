import * as didResolver from 'did-resolver';
import * as didJwt from 'did-jwt';

export type TypedJWTPayload<T = any> = T & didJwt.JWTPayload;

export type TypedJWTDecoded<T = any> = {
  header: didJwt.JWTHeader;
  payload: TypedJWTPayload<T>;
  signature: string;
  data: string;
};

/**
 * the key pair
 */
export type KeyPair = {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
};

/**
 * x and y of JsonWebKey2020
 */
export type JsonWebKeyXY = {
  // base64url
  x: string;
  // base64url
  y: string;
};

export type AlgName = 'EdDSA' | 'ES256K' | 'ES256';

/**
 * crypto algorithm
 */
export interface Alg {
  /**
   * Generates the key pair
   *
   * @returns the key pair
   */
  generateKeyPair: () => KeyPair;

  /**
   * Converts the public key to the base58btc multibase
   *
   * @param publicKey - the public key
   * @returns the base58btc multibase
   */
  multibaseFromPublicKey: (publicKey: Uint8Array) => string;

  /**
   * Converts the base58btc multibase to the public key
   *
   * @param multibase - the base58btc multibase
   * @returns the public key
   */
  publicKeyFromMultibase: (multibase: string) => Uint8Array;

  /**
   * Creates the signer from the secret key
   *
   * @param secretKey
   * @returns the signer
   */
  signerFromSecretKey: (secretKey: Uint8Array) => didJwt.Signer;

  /**
   * Creates the publicKeyJWK object from the public key
   *
   * @param publicKey
   * @returns the publicKeyJwk object
   */
  publicKeyJwkFromPublicKey: (publicKey: Uint8Array) => didResolver.JsonWebKey;
}
