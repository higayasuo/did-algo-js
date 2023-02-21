import * as didResolver from 'did-resolver';
import * as didJwt from 'did-jwt';
import * as didJwtVc from 'did-jwt-vc';

export type AlgName = 'EdDSA' | 'ES256K' | 'ES256';

export const DEFAULT_CONTEXT = 'https://www.w3.org/2018/credentials/v1';
export const DEFAULT_VC_TYPE = 'VerifiableCredential';
export const DEFAULT_VP_TYPE = 'VerifiablePresentation';

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

export type Extensible<T> = T & { [x: string]: any };

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
export type VerifiedJWT<T = Record<string, any>> = Replace<
  didJwt.JWTVerified,
  { payload: didJwt.JWTPayload & T }
>;

export type VerifyJWTOptions = Partial<didJwt.JWTVerifyOptions>;

export interface CredentialStatus {
  id: string;
  type: string;
}

type CredentialSubject = Extensible<{ id?: string }>;

type VC<T> = Extensible<{
  '@context': string[] | string;
  type: string[] | string;
  credentialSubject: CredentialSubject & T;
  credentialStatus?: CredentialStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  evidence?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  termsOfUse?: any;
}>;

/**
 * A JWT payload representation of a Credential
 * @see https://www.w3.org/TR/vc-data-model/#jwt-encoding
 */
export type CredentialJWTPayload<T> = {
  iss?: string;
  sub?: string;
  vc: VC<T>;
  nbf?: number;
  aud?: string | string[];
  exp?: number;
  jti?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
};

/**
 * Represents the creation options that can be passed to the createCredentialJWT method.
 */
export type CreateCredentialJWTOptions = didJwtVc.CreateCredentialOptions;

export type Proof = Extensible<{
  type?: string;
}>;

/**
 * Represents a readonly representation of a verifiable object, including the {@link Proof}
 * property that can be used to verify it.
 */
export type Verifiable<T> = Readonly<T> & { readonly proof: Proof };

/**
 * This data type represents a parsed VerifiableCredential.
 * It is meant to be an unambiguous representation of the properties of a Credential and is usually the result of a
 * transformation method.
 *
 * `issuer` is always an object with an `id` property and potentially other app specific issuer claims
 * `issuanceDate` is an ISO DateTime string
 * `expirationDate`, is a nullable ISO DateTime string
 *
 * Any JWT specific properties are transformed to the broader W3C variant and any app specific properties are left
 * intact
 */
export type W3CCredential<T> = {
  '@context': string[];
  id?: string;
  type: string[];
  issuer: {
    id: string;
  };
  issuanceDate: string;
  expirationDate?: string;
  credentialSubject: Extensible<{
    id?: string;
  }> &
    T;
  credentialStatus?: CredentialStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  evidence?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  termsOfUse?: any;
};

/**
 * Represents the result of a Credential verification.
 * It includes the properties produced by `did-jwt` and a W3C compliant representation of
 * the Credential that was just verified.
 *
 * This is usually the result of a verification method and not meant to be created by generic code.
 */
export type VerifiedCredentialJWT<T> = VerifiedJWT<{ vc: VC<T> }> & {
  verifiableCredential: Verifiable<W3CCredential<T>>;
};

/**
 * Represents the Verification Options that can be passed to the verifyCredential method.
 * These options are forwarded to the lower level verification code
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VerifyCredentialJWTOptions = didJwtVc.VerifyCredentialOptions;

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
