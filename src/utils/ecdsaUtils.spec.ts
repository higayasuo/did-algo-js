import { describe, it, expect } from 'vitest';

import * as elliptic from 'elliptic';
import * as u8a from 'uint8arrays';

import * as ecdsaUtils from './ecdsaUtils';

const secp256k1 = new elliptic.ec('secp256k1');

describe('ecdsaUtils', () => {
  it('generationKeyPair should work', () => {
    const actual = ecdsaUtils.generateKeyPair(secp256k1);

    expect(actual.publicKey.length).toEqual(33);
    expect(actual.secretKey.length).toEqual(32);
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
