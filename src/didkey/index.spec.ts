import { describe, it, expect } from 'vitest';

import * as didKey from '.';
import * as alg from '../alg';

describe('didKey', () => {
  it('getDriver should work', () => {
    expect(didKey.getDriver('EdDSA')).toBe(didKey.ed25519Driver);
    expect(didKey.getDriver('ES256K')).toBe(didKey.secp256k1Driver);
    expect(didKey.getDriver('ES256')).toBe(didKey.p256Driver);
  });
});
