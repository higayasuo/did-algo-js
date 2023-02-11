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
 * crypto algorithm
 */
export interface Alg {
  generateKeyPair: () => KeyPair;
  multibaseFromPublicKey: (publicKey: Uint8Array) => string;
  signerFromSecretKey: (secretKey: Uint8Array) => didJwt.Signer;
}
