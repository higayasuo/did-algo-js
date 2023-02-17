import * as didResolver from 'did-resolver';
import * as didJwt from 'did-jwt';

export type AlgName = 'EdDSA' | 'ES256K' | 'ES256';

export type JWTPayload = Partial<didJwt.JWTPayload>;

export type JWTOptions = Omit<didJwt.JWTOptions, 'alg'>;

export type JWTHeader = Omit<didJwt.JWTHeader, 'alg'> & {
  alg: AlgName;
};

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
 * Overrides the different types of checks performed on the JWT besides the signature check
 */
export interface JWTVerifyPolicies {
  // overrides the timestamp against which the validity interval is checked
  now?: number;
  // when set to false, the timestamp checks ignore the Not Before(`nbf`) property
  nbf?: boolean;
  // when set to false, the timestamp checks ignore the Issued At(`iat`) property
  iat?: boolean;
  // when set to false, the timestamp checks ignore the Expires At(`exp`) property
  exp?: boolean;
  // when set to false, the JWT audience check is skipped
  aud?: boolean;
}

/**
 * Result object returned by verifyJWT
 */
export type TypedJWTVerified<T extends didJwt.JWTPayload = didJwt.JWTPayload> =
  {
    /**
     * Set to true for a JWT that passes all the required checks minus any verification overrides.
     */
    verified: true;

    /**
     * The decoded JWT payload
     */
    payload: T;

    /**
     * The result of resolving the issuer DID
     */
    didResolutionResult: didResolver.DIDResolutionResult;

    /**
     * the issuer DID
     */
    issuer: string;

    /**
     * The public key of the issuer that matches the JWT signature
     */
    signer: didResolver.VerificationMethod;

    /**
     * The original JWT that was verified
     */
    jwt: string;

    /**
     * Any overrides that were used during verification
     */
    policies?: JWTVerifyPolicies;
  };

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
   * Creates the publicKeyJWK object from the public key
   *
   * @param publicKey - the public key
   * @returns a publicKeyJwk object
   */
  publicKeyJwkFromPublicKey: (publicKey: Uint8Array) => didResolver.JsonWebKey;
}
