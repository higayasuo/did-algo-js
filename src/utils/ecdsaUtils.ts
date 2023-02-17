import * as elliptic from 'elliptic';
import * as u8a from 'uint8arrays';

import * as types from '../types';

/**
 * Converts the elliptic curve key pair to a key pair
 *
 * @param ecKeyPair - the elliptic curve key pair
 * @returns a key pair
 */
export const keyPairFromECKeyPair = (
  ecKeyPair: elliptic.ec.KeyPair
): types.KeyPair => {
  const publicKey = Uint8Array.from(ecKeyPair.getPublic().encodeCompressed());
  const secretKey = u8a.fromString(ecKeyPair.getPrivate('hex'), 'hex');

  return { publicKey, secretKey };
};

/**
 * Converts the secret key to a key pair
 *
 * @param ecKeyPair - the elliptic curve key pair
 * @param secretKey - the secret key
 * @returns a key pair
 */
export const keyPairFromSecretKey = (
  ec: elliptic.ec,
  secretKey: Uint8Array
): types.KeyPair => {
  const ecKeyPair = ec.keyFromPrivate(secretKey);

  return keyPairFromECKeyPair(ecKeyPair);
};

/**
 * Generates a key pair
 *
 * @param ec - the elliptic curve
 * @returns a key pair
 */
export const generateKeyPair = (ec: elliptic.ec): types.KeyPair => {
  return keyPairFromECKeyPair(ec.genKeyPair());
};

/**
 * Converts the public key to x and y
 *
 * @param ec - the elliptic curve
 * @param publicKey - the public key
 * @returns x and y
 */
export const xyFromPublicKey = (
  ec: elliptic.ec,
  publicKey: Uint8Array
): types.JsonWebKeyXY => {
  const key = ec.keyFromPublic(publicKey);
  const pub = key.getPublic();

  const x = u8a.toString(Uint8Array.from(pub.getX().toArray()), 'base64url');
  const y = u8a.toString(Uint8Array.from(pub.getY().toArray()), 'base64url');

  return { x, y };
};
