import * as elliptic from 'elliptic';
import * as u8a from 'uint8arrays';

import * as types from '../types';

/**
 * Converts the ec key pair to the key pair
 *
 * @param ecKeyPair - elliptic curve key pair
 * @returns the key pair
 */
export const keyPairFromECKeyPair = (
  ecKeyPair: elliptic.ec.KeyPair
): types.KeyPair => {
  const publicKey = Uint8Array.from(ecKeyPair.getPublic().encodeCompressed());
  const secretKey = u8a.fromString(ecKeyPair.getPrivate('hex'), 'hex');

  return { publicKey, secretKey };
};

/**
 * Converts the secret key to the key pair
 *
 * @param ecKeyPair - elliptic curve key pair
 * @param secretKey - the secret key
 * @returns the key pair
 */
export const keyPairFromSecretKey = (
  ec: elliptic.ec,
  secretKey: Uint8Array
): types.KeyPair => {
  const ecKeyPair = ec.keyFromPrivate(secretKey);

  return keyPairFromECKeyPair(ecKeyPair);
};

/**
 * Generates the key pair
 *
 * @param ec - elliptic curve
 * @returns the key pair
 */
export const generateKeyPair = (ec: elliptic.ec): types.KeyPair => {
  return keyPairFromECKeyPair(ec.genKeyPair());
};

/**
 * Converts the public key to x and y
 *
 * @param - ec elliptic curve
 * @param - publicKey the public key
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
