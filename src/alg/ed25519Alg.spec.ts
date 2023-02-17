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

  it('keyPairFromSecretKey should work', () => {
    const keyPair = ed25519Alg.generateKeyPair();
    const keyPair2 = ed25519Alg.keyPairFromSecretKey(keyPair.secretKey);

    expect(keyPair).toEqual(keyPair2);
  });

  it('multibaseFromPublicKey should work', () => {
    const keyPair = ed25519Alg.generateKeyPair();

    expect(
      ed25519Alg
        .multibaseFromPublicKey(keyPair.publicKey)
        .startsWith(multibaseUtils.MULTIBASE_BASE58BTC_ED25519_PREFIX)
    ).to.be.true;
  });

  it('publicKeyFromMultibase should work', () => {
    const keyPair = ed25519Alg.generateKeyPair();
    const multibase = ed25519Alg.multibaseFromPublicKey(keyPair.publicKey);

    expect(ed25519Alg.publicKeyFromMultibase(multibase)).to.toEqual(
      keyPair.publicKey
    );
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

  it('publicKeyJwkFromPublicKey should work', async () => {
    const keyPair = ed25519Alg.generateKeyPair();
    const signer = ed25519Alg.signerFromSecretKey(keyPair.secretKey);
    const publicKeyJwk = ed25519Alg.publicKeyJwkFromPublicKey(
      keyPair.publicKey
    );

    expect(publicKeyJwk.kty).toEqual('OKP');
    expect(publicKeyJwk.crv).toEqual('Ed25519');
    expect(signer).to.toBeDefined();

    const message = u8a.fromString('hello', 'utf-8');
    const signature = u8a.fromString(
      (await signer(message)) as string,
      'base64url'
    );
    const publicKey = u8a.fromString(publicKeyJwk.x as string, 'base64url');

    expect(ed25519.verify(publicKey, message, signature)).to.be.true;
  });
});
