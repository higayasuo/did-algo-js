import * as didResolver from 'did-resolver';
import * as didJwt from 'did-jwt';

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
 * Result object returned by {@link verifyJWT}
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
   * Converts the secret key to the key pair
   *
   * @param secretKey - the secret key
   * @returns the key pair
   */
  keyPairFromSecretKey: (secretKey: Uint8Array) => KeyPair;

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
