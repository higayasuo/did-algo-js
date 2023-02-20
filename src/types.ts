import * as didResolver from 'did-resolver';
import * as didJwt from 'did-jwt';
import * as didJwtVc from 'did-jwt-vc';

export type AlgName = 'EdDSA' | 'ES256K' | 'ES256';

/**
 * PartialRequired
 *
 * @example
 *    type Props = {
 *      name?: string;
 *      age?: number;
 *      visible?: boolean;
 *    };
 *
 *    // Expect: { name?: string; age?: number; visible?: boolean; }
 *    type Props = PartialRequired<Props>;
 *
 *    // Expect: { name?: string; age: number; visible: boolean; }
 *    type Props = PartialRequired<Props, 'age' | 'visible'>;
 */
export type PartialRequired<
  T extends object,
  K extends keyof T = keyof T
> = Required<Pick<T, K>> & Omit<T, K>;

/**
 * Replaces the matching property types of T with the ones in U
 */
export type Replace<T, U> = Omit<T, keyof U> & U;

/**
 * the JWT payload
 */
export type JWTPayload = Partial<didJwt.JWTPayload>;

/**
 * the JWT header
 */
export type JWTHeader = Partial<didJwt.JWTHeader>;

/**
 * the options for createJWT
 */
export type CreateJWTOptions = Partial<didJwt.JWTOptions> & {
  header?: JWTHeader;
};

/**
 * the issuer
 */
export type Issuer = didJwtVc.Issuer;

/**
 * Result object returned by verifyJWT
 */
export type VerifiedJWT<T> = Replace<
  didJwt.JWTVerified,
  { payload: didJwt.JWTPayload & T }
>;

export type VerifyJWTOptions = Partial<didJwt.JWTVerifyOptions>;

/**
 * key pair
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

/**
 * crypto algorithm
 */
export interface Alg {
  /**
   * Generates a key pair
   *
   * @returns a key pair
   */
  generateKeyPair: () => KeyPair;

  /**
   * Converts the secret key to a key pair
   *
   * @param secretKey - the secret key
   * @returns a key pair
   */
  keyPairFromSecretKey: (secretKey: Uint8Array) => KeyPair;

  /**
   * Converts the public key to a base58btc multibase
   *
   * @param publicKey - the public key
   * @returns a base58btc multibase
   */
  multibaseFromPublicKey: (publicKey: Uint8Array) => string;

  /**
   * Converts the base58btc multibase to a public key
   *
   * @param multibase - the base58btc multibase
   * @returns a public key
   */
  publicKeyFromMultibase: (multibase: string) => Uint8Array;

  /**
   * Creates a signer from the secret key
   *
   * @param secretKey - the secret key
   * @returns a signer
   */
  signerFromSecretKey: (secretKey: Uint8Array) => didJwt.Signer;

  /**
   * Converts the key pair to an issuer
   *
   * @param keyPair - the key pair
   * @returns an issuer
   */
  issuerFromKeyPair: (keyPair: KeyPair) => didJwtVc.Issuer;

  /**
   * Creates the publicKeyJWK object from the public key
   *
   * @param publicKey - the public key
   * @returns a publicKeyJwk object
   */
  publicKeyJwkFromPublicKey: (publicKey: Uint8Array) => didResolver.JsonWebKey;
}
