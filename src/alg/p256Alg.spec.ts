import { describe, it, expect } from 'vitest';

import * as multibaseUtils from '../utils/multibaseUtils';
import { p256Alg } from './p256Alg';

describe('p256Alg', () => {
  it('generateKeyPair should work', () => {
    const keyPair = p256Alg.generateKeyPair();

    expect(keyPair.publicKey.length).to.eq(33);
    expect(keyPair.secretKey.length).to.eq(32);
  });

  it('multibaseFromPublicKey should work', () => {
    const keyPair = p256Alg.generateKeyPair();

    expect(
      p256Alg
        .multibaseFromPublicKey(keyPair.publicKey)
        .startsWith(multibaseUtils.MULTIBASE_BASE58BTC_P256_PREFIX)
    ).to.be.true;
  });
});
