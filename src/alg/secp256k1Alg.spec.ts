import { describe, it, expect } from 'vitest';

import * as elliptic from 'elliptic';
import * as sha256 from '@stablelib/sha256';
import * as u8a from 'uint8arrays';

import * as multibaseUtils from '../utils/multibaseUtils';
import { secp256k1Alg } from './secp256k1Alg';

const secp256k1 = new elliptic.ec('secp256k1');

describe('secp256k1Alg', () => {
  it('generateKeyPair should work', () => {
    const keyPair = secp256k1Alg.generateKeyPair();

    expect(keyPair.publicKey.length).to.eq(33);
    expect(keyPair.secretKey.length).to.eq(32);
  });

  it('keyPairFromSecretKey should work', () => {
    const keyPair = secp256k1Alg.generateKeyPair();
    const keyPair2 = secp256k1Alg.keyPairFromSecretKey(keyPair.secretKey);

    expect(keyPair).toEqual(keyPair2);
  });

  it('multibaseFromPublicKey should work', () => {
    const keyPair = secp256k1Alg.generateKeyPair();

    expect(
      secp256k1Alg
        .multibaseFromPublicKey(keyPair.publicKey)
        .startsWith(multibaseUtils.MULTIBASE_BASE58BTC_SECP256K1_PREFIX)
    ).to.be.true;
  });

  it('publicKeyFromMultibase should work', () => {
    const keyPair = secp256k1Alg.generateKeyPair();
    const multibase = secp256k1Alg.multibaseFromPublicKey(keyPair.publicKey);

    expect(secp256k1Alg.publicKeyFromMultibase(multibase)).to.toEqual(
      keyPair.publicKey
    );
  });

  it('signerFromSecretKey should work', async () => {
    const keyPair = secp256k1Alg.generateKeyPair();
    const signer = secp256k1Alg.signerFromSecretKey(keyPair.secretKey);

    expect(signer).to.toBeDefined();

    const message = u8a.fromString('hello', 'utf-8');
    const sig = (await signer(message)) as string;
    const rawSig = u8a.fromString(sig, 'base64url');
    const r = u8a.toString(rawSig.slice(0, 32), 'hex');
    const s = u8a.toString(rawSig.slice(32, 64), 'hex');
    const hash = sha256.hash(message);

    expect(
      secp256k1.keyFromPublic(keyPair.publicKey).verify(hash, { r, s })
    ).toBeTruthy();
  });

  it('issuerFromKeyKeyPair should work', async () => {
    const keyPair = secp256k1Alg.generateKeyPair();
    const issuer = secp256k1Alg.issuerFromKeyPair(keyPair);

    expect(issuer).to.toBeDefined();
    expect(issuer.did.startsWith('did:key:')).toBeTruthy();
    expect(issuer.signer).toBeDefined();
    expect(issuer.alg).toEqual('ES256K');

    const message = u8a.fromString('hello', 'utf-8');
    const sig = (await issuer.signer(message)) as string;
    const rawSig = u8a.fromString(sig, 'base64url');
    const r = u8a.toString(rawSig.slice(0, 32), 'hex');
    const s = u8a.toString(rawSig.slice(32, 64), 'hex');
    const hash = sha256.hash(message);

    expect(
      secp256k1.keyFromPublic(keyPair.publicKey).verify(hash, { r, s })
    ).toBeTruthy();
  });

  it('publicKeyJwkFromPublicKey should work', async () => {
    const keyPair = secp256k1Alg.generateKeyPair();
    const signer = secp256k1Alg.signerFromSecretKey(keyPair.secretKey);
    const publicKeyJwk = secp256k1Alg.publicKeyJwkFromPublicKey(
      keyPair.publicKey
    );

    expect(signer).to.toBeDefined();
    expect(publicKeyJwk.kty).toEqual('EC');
    expect(publicKeyJwk.crv).toEqual('secp256k1');

    const message = u8a.fromString('hello', 'utf-8');

    const sig = (await signer(message)) as string;
    const rawSig = u8a.fromString(sig, 'base64url');
    const r = u8a.toString(rawSig.slice(0, 32), 'hex');
    const s = u8a.toString(rawSig.slice(32, 64), 'hex');
    const hash = sha256.hash(message);

    const key = secp256k1.keyFromPublic({
      x: u8a.toString(
        u8a.fromString(publicKeyJwk.x as string, 'base64url'),
        'hex'
      ),
      y: u8a.toString(
        u8a.fromString(publicKeyJwk.y as string, 'base64url'),
        'hex'
      ),
    });
    const publicKey = u8a.fromString(key.getPublic('hex'), 'hex');

    expect(secp256k1.keyFromPublic(publicKey).verify(hash, { r, s })).to.be
      .true;
  });
});
