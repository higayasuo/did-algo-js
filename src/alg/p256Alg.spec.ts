import { describe, it, expect } from 'vitest';

import * as elliptic from 'elliptic';
import * as u8a from 'uint8arrays';
import * as sha256 from '@stablelib/sha256';

import * as multibaseUtils from '../utils/multibaseUtils';
import { p256Alg } from './p256Alg';

const p256 = new elliptic.ec('p256');

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

  it('signerFromSecretKey should work', async () => {
    const keyPair = p256Alg.generateKeyPair();
    const signer = p256Alg.signerFromSecretKey(keyPair.secretKey);

    expect(signer).to.toBeDefined();

    const message = u8a.fromString('hello', 'utf-8');

    const sig = (await signer(message)) as string;
    const rawSig = u8a.fromString(sig, 'base64url');
    const r = u8a.toString(rawSig.slice(0, 32), 'hex');
    const s = u8a.toString(rawSig.slice(32, 64), 'hex');
    const hash = sha256.hash(message);

    expect(p256.keyFromPublic(keyPair.publicKey).verify(hash, { r, s })).to.be
      .true;
  });
});
