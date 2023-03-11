import * as u8a from 'uint8arrays';

import * as types from '../types';
import * as alg from '../alg';
import * as errors from '../errors';

// multibase base58-btc header
const MULTIBASE_BASE58BTC_HEADER = 'z';
// multibase base58-btc ed25519 prefix
export const MULTIBASE_BASE58BTC_ED25519_PREFIX = 'z6Mk';
// multibase base58-btc x25519 prefix
export const MULTIBASE_BASE58BTC_X25519_PREFIX = 'z6LS';
// multibase base58-btc secp256k1 prefix
export const MULTIBASE_BASE58BTC_SECP256K1_PREFIX = 'zQ3s';
// multibase base58-btc p256 prefix
export const MULTIBASE_BASE58BTC_P256_PREFIX = 'zDn';
// multicodec ed25519-pub header
export const MULTICODEC_ED25519_PUB_HEADER = Uint8Array.from([237, 1]);
// multicodec x25519-pub header
export const MULTICODEC_X25519_PUB_HEADER = Uint8Array.from([236, 1]);
// multicodec secp256k1-pub header
export const MULTICODEC_SECP256K1_PUB_HEADER = Uint8Array.from([231, 1]);
// multicodec p256-pub header
export const MULTICODEC_P256_PUB_HEADER = Uint8Array.from([128, 36]);

/**
 * Converts the public key to a base58btc multibase
 *
 * @param multicodeHeader - the multicodec header
 * @param publicKey - the public key
 * @returns a base58btc multibase
 */
export const multibaseFromPublicKey = (
  multicodeHeader: Uint8Array,
  publicKey: Uint8Array
): string => {
  const mbKey = new Uint8Array(multicodeHeader.length + publicKey.length);

  mbKey.set(multicodeHeader);
  mbKey.set(publicKey, multicodeHeader.length);

  return MULTIBASE_BASE58BTC_HEADER + u8a.toString(mbKey, 'base58btc');
};

/**
 * Converts the base58btc multibase to aaa public key
 *
 * @param multibase - the base58btc multibase
 * @returns a public key
 */
export const publicKeyFromMultibase = (
  multicodecHeader: Uint8Array,
  multibase: string
): Uint8Array => {
  if (multibase[0] !== MULTIBASE_BASE58BTC_HEADER) {
    throw new Error(
      `${errors.invalidMultibaseHeader}: The multibase must start with ${MULTIBASE_BASE58BTC_HEADER}, but ${multibase[0]}`
    );
  }

  const multicodec = u8a.fromString(multibase.slice(1), 'base58btc');
  const header = multicodec.slice(0, multicodecHeader.length);

  if (!u8a.equals(multicodecHeader, header)) {
    throw new Error(
      `${errors.invalidMulticodecHeader}: The multicodec must start with [${multicodecHeader}], but [${header}]`
    );
  }

  return multicodec.slice(multicodecHeader.length);
};

/**
 * Returns crypto algorithm from the base58btc multibase
 *
 * @param multibase the base58btc multibase
 * @returns crypt algorithm
 */
export const algFromMultibase = (multibase: string): types.Alg => {
  if (multibase.startsWith(MULTIBASE_BASE58BTC_ED25519_PREFIX)) {
    return alg.ed25519Alg;
  } else if (multibase.startsWith(MULTIBASE_BASE58BTC_SECP256K1_PREFIX)) {
    return alg.secp256k1Alg;
  } else if (multibase.startsWith(MULTIBASE_BASE58BTC_P256_PREFIX)) {
    return alg.p256Alg;
  }

  throw new Error(
    `${errors.unsupportedPublicKeyType}: The multibase must start with either ${MULTIBASE_BASE58BTC_ED25519_PREFIX}, ${MULTIBASE_BASE58BTC_SECP256K1_PREFIX}, or ${MULTIBASE_BASE58BTC_P256_PREFIX}, but ${multibase}`
  );
};
