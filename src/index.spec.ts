import { describe, it, expect } from 'vitest';

import * as didKit from '.';

describe('did-jwt-toolkit', () => {
  it('getDIDKeyDriver should work', () => {
    expect(didKit.getDIDKeyDriver('EdDSA')).toBeDefined();
  });
});
