import { describe, it, expect } from 'vitest';

import * as elliptic from 'elliptic';
import * as ed25519 from '@stablelib/ed25519';
import * as u8a from 'uint8arrays';
import * as sha256 from '@stablelib/sha256';

import * as multibaseUtils from '../utils/multibaseUtils';
import * as ed25519Alg from '../alg/ed25519Alg';
import * as secp256k1Alg from '../alg/secp256k1Alg';
import * as p256Alg from '../alg/p256Alg';
import * as didKeyDriver from './didKeyDriver';

const ed25519Driver = new didKeyDriver.DidKeyDriver(ed25519Alg.ed25519Alg);
const secp256k1Driver = new didKeyDriver.DidKeyDriver(
  secp256k1Alg.secp256k1Alg
);
const p256Driver = new didKeyDriver.DidKeyDriver(p256Alg.p256Alg);

const secp256k1 = new elliptic.ec('secp256k1');
const p256 = new elliptic.ec('p256');

describe('didKeyDriver', () => {
  it('generateKeyPair should work', () => {
    const ed25519KeyPair = ed25519Driver.generateKeyPair();
    const secp256k1KeyPair = secp256k1Driver.generateKeyPair();
    const p256KeyPair = p256Driver.generateKeyPair();

    expect(ed25519KeyPair.publicKey.length).to.eq(32);
    expect(ed25519KeyPair.secretKey.length).to.eq(64);

    expect(secp256k1KeyPair.publicKey.length).to.eq(33);
    expect(secp256k1KeyPair.secretKey.length).to.eq(32);

    expect(p256KeyPair.publicKey.length).to.eq(33);
    expect(p256KeyPair.secretKey.length).to.eq(32);
  });

  it('didFromPublicKey should work', () => {
    const ed25519KeyPair = ed25519Driver.generateKeyPair();
    const secp256k1KeyPair = secp256k1Driver.generateKeyPair();
    const p256KeyPair = p256Driver.generateKeyPair();

    expect(
      ed25519Driver
        .didFromPublicKey(ed25519KeyPair.publicKey)
        .startsWith('did:key:z6Mk')
    ).to.be.true;
    expect(
      secp256k1Driver
        .didFromPublicKey(secp256k1KeyPair.publicKey)
        .startsWith('did:key:zQ3s')
    ).to.be.true;
    expect(
      p256Driver
        .didFromPublicKey(p256KeyPair.publicKey)
        .startsWith('did:key:zDn')
    ).to.be.true;
  });

  it('signerFromSecretKey for ed25519 should work', async () => {
    const keyPair = ed25519Driver.generateKeyPair();
    const signer = ed25519Driver.signerFromSecretKey(keyPair.secretKey);
    const data = u8a.fromString('hello', 'utf-8');
    const signature = (await signer(data)) as string;

    expect(signer).toBeDefined();

    expect(
      ed25519.verify(
        keyPair.publicKey,
        data,
        u8a.fromString(signature, 'base64url')
      )
    ).to.be.true;
  });

  it('signerFromSecretKey for secp256k1 should work', async () => {
    const keyPair = secp256k1Driver.generateKeyPair();
    const signer = secp256k1Driver.signerFromSecretKey(keyPair.secretKey);

    expect(signer).to.toBeDefined();

    const message = u8a.fromString('hello', 'utf-8');

    const sig = (await signer(message)) as string;
    const rawSig = u8a.fromString(sig, 'base64url');
    const r = u8a.toString(rawSig.slice(0, 32), 'hex');
    const s = u8a.toString(rawSig.slice(32, 64), 'hex');
    const hash = sha256.hash(message);

    expect(secp256k1.keyFromPublic(keyPair.publicKey).verify(hash, { r, s })).to
      .be.true;
  });

  it('signerFromSecretKey for p256 should work', async () => {
    const keyPair = p256Driver.generateKeyPair();
    const signer = p256Driver.signerFromSecretKey(keyPair.secretKey);

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
