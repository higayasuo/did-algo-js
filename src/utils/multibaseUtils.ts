import * as u8a from 'uint8arrays';
import * as types from '../types';

import * as errors from '../errors';

// multibase base58-btc header
const MULTIBASE_BASE58BTC_HEADER = 'z';
// multibase base58-btc ed25519 prefix
export const MULTIBASE_BASE58BTC_ED25519_PREFIX = 'z6Mk';
// multibase base58-btc secp256k1 prefix
export const MULTIBASE_BASE58BTC_SECP256K1_PREFIX = 'zQ3s';
// multibase base58-btc p256 prefix
export const MULTIBASE_BASE58BTC_P256_PREFIX = 'zDn';
// multicodec ed25519-pub header
export const MULTICODEC_ED25519_PUB_HEADER = Uint8Array.from([237, 1]);
// multicodec secp256k1-pub header
export const MULTICODEC_SECP256K1_PUB_HEADER = Uint8Array.from([231, 1]);
// multicodec p256-pub header
export const MULTICODEC_P256_PUB_HEADER = Uint8Array.from([128, 36]);

/**
 * Converts the public key to the base58btc multibase
 *
 * @param header - multicodec header
 * @param publicKey - the public key
 * @returns the base58btc multibase
 */
export const multibaseFromPublicKey = (
  header: Uint8Array,
  publicKey: Uint8Array
): string => {
  const mbKey = new Uint8Array(header.length + publicKey.length);

  mbKey.set(header);
  mbKey.set(publicKey, header.length);

  return MULTIBASE_BASE58BTC_HEADER + u8a.toString(mbKey, 'base58btc');
};

/**
 * Returns the multicodec header
 *
 * @param multibase the base58btc multibase
 * @returns the multicodec header
 */
export const getMulticodecHeader = (multibase: string): Uint8Array => {
  if (multibase.startsWith(MULTIBASE_BASE58BTC_ED25519_PREFIX)) {
    return MULTICODEC_ED25519_PUB_HEADER;
  } else if (multibase.startsWith(MULTIBASE_BASE58BTC_SECP256K1_PREFIX)) {
    return MULTICODEC_SECP256K1_PUB_HEADER;
  } else if (multibase.startsWith(MULTIBASE_BASE58BTC_P256_PREFIX)) {
    return MULTICODEC_P256_PUB_HEADER;
  }

  throw new Error(
    `${errors.unsupportedPublicKeyType}:The multibase must start with either ${MULTIBASE_BASE58BTC_ED25519_PREFIX}, ${MULTIBASE_BASE58BTC_SECP256K1_PREFIX}, or ${MULTIBASE_BASE58BTC_P256_PREFIX}, but ${multibase}`
  );
};

/**
 * Converts the base58btc multibase to the public key
 *
 * @param multibase - the base58btc multibase
 * @returns the public key
 */
export const publicKeyFromMultibase = (multibase: string): Uint8Array => {
  const multicodecHeader = getMulticodecHeader(multibase);
  const multicodec = u8a.fromString(multibase.slice(1), 'base58btc');

  return multicodec.slice(multicodecHeader.length);
};
