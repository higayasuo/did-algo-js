import { describe, it, expect } from 'vitest';

import * as ed25519 from '@stablelib/ed25519';
import * as u8a from 'uint8arrays';

import * as multibaseUtils from '../utils/multibaseUtils';
import { ed25519Alg } from './ed25519Alg';

describe('ed25519Alg', () => {
  it('generateKeyPair should work', () => {
    const keyPair = ed25519Alg.generateKeyPair();

    expect(keyPair.publicKey.length).to.eq(32);
    expect(keyPair.secretKey.length).to.eq(64);
  });

  it('multibaseFromPublicKey should work', () => {
    const keyPair = ed25519Alg.generateKeyPair();

    expect(
      ed25519Alg
        .multibaseFromPublicKey(keyPair.publicKey)
        .startsWith(multibaseUtils.MULTIBASE_BASE58BTC_ED25519_PREFIX)
    ).to.be.true;
  });

  it('signerFromSecretKey should work', async () => {
    const keyPair = ed25519Alg.generateKeyPair();
    const signer = ed25519Alg.signerFromSecretKey(keyPair.secretKey);

    expect(signer).to.toBeDefined();

    const message = u8a.fromString('hello', 'utf-8');
    const signature = u8a.fromString(
      (await signer(message)) as string,
      'base64url'
    );

    expect(ed25519.verify(keyPair.publicKey, message, signature)).to.be.true;
  });
});
