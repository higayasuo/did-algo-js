import * as types from '../types';
import * as ed25519Alg from '../alg/ed25519Alg';
import * as secp256k1Alg from '../alg/secp256k1Alg';
import * as p256Alg from '../alg/p256Alg';
import * as didKeyDriver from './didKeyDriver';

/**
 * the ed25519 driver
 */
export const ed25519Driver = new didKeyDriver.DIDKeyDriver(
  ed25519Alg.ed25519Alg
);

/**
 * the secp256k1 driver
 */
export const secp256k1Driver = new didKeyDriver.DIDKeyDriver(
  secp256k1Alg.secp256k1Alg
);

/**
 * the p256 driver
 */
export const p256Driver = new didKeyDriver.DIDKeyDriver(p256Alg.p256Alg);

/**
 * Returns a did:key driver
 *
 * @param algName - the crypto algorithm name
 * @returns a did:key driver
 */
export const getDriver = (
  algName: types.AlgName
): didKeyDriver.DIDKeyDriver => {
  if (algName === 'EdDSA') {
    return ed25519Driver;
  } else if (algName === 'ES256K') {
    return secp256k1Driver;
  } else {
    return p256Driver;
  }
};
