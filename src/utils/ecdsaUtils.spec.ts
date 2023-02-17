import { describe, it, expect } from 'vitest';

import * as elliptic from 'elliptic';
import * as u8a from 'uint8arrays';

import * as ecdsaUtils from './ecdsaUtils';

const secp256k1 = new elliptic.ec('secp256k1');

describe('ecdsaUtils', () => {
  it('keyPairFromECKeyPair should work', () => {
    const ecKeyPair = secp256k1.genKeyPair();
    const keyPair = ecdsaUtils.keyPairFromECKeyPair(ecKeyPair);

    expect(keyPair.publicKey.length).toEqual(33);
    expect(keyPair.secretKey.length).toEqual(32);
  });

  it('keyPairFromSecretKey should work', () => {
    const keyPair = ecdsaUtils.generateKeyPair(secp256k1);
    const keyPair2 = ecdsaUtils.keyPairFromSecretKey(
      secp256k1,
      keyPair.secretKey
    );

    expect(keyPair).toEqual(keyPair2);
  });

  it('generationKeyPair should work', () => {
    const keyPair = ecdsaUtils.generateKeyPair(secp256k1);

    expect(keyPair.publicKey.length).toEqual(33);
    expect(keyPair.secretKey.length).toEqual(32);
  });

  it('xyFromPublicKey should work', () => {
    const keyPair = ecdsaUtils.generateKeyPair(secp256k1);
    const { x, y } = ecdsaUtils.xyFromPublicKey(secp256k1, keyPair.publicKey);

    const key = secp256k1.keyFromPublic({
      x: u8a.toString(u8a.fromString(x, 'base64url'), 'hex'),
      y: u8a.toString(u8a.fromString(y, 'base64url'), 'hex'),
    });

    expect(keyPair.publicKey).toEqual(
      Uint8Array.from(key.getPublic().encodeCompressed())
    );
  });
});
