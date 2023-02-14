import { describe, it, expect } from 'vitest';

import * as didkey from '.';

describe('didkey', () => {
  it('getDriver should work', () => {
    expect(didkey.getDriver('EdDSA')).toBe(didkey.ed25519Driver);
    expect(didkey.getDriver('ES256K')).toBe(didkey.secp256k1Driver);
    expect(didkey.getDriver('ES256')).toBe(didkey.p256Driver);
  });
});
