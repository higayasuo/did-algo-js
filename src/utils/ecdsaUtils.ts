import * as elliptic from 'elliptic';
import * as u8a from 'uint8arrays';

import * as types from '../types';

/**
 * Generates the key pair
 *
 * @param ec - elliptic curve
 * @returns the key pair
 */
export const generateKeyPair = (ec: elliptic.ec): types.KeyPair => {
  const keyPair = ec.genKeyPair();
  const publicKey = Uint8Array.from(keyPair.getPublic().encodeCompressed());
  const secretKey = u8a.fromString(keyPair.getPrivate('hex'), 'hex');

  return { publicKey, secretKey };
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
