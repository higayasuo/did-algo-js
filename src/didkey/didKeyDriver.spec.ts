import { describe, it, expect } from 'vitest';

import * as elliptic from 'elliptic';
import * as ed25519 from '@stablelib/ed25519';
import * as didJwt from 'did-jwt';
import * as didResolver from 'did-resolver';
import * as u8a from 'uint8arrays';
import * as sha256 from '@stablelib/sha256';

import * as multibaseUtils from '../utils/multibaseUtils';
import * as ed25519Alg from '../alg/ed25519Alg';
import * as secp256k1Alg from '../alg/secp256k1Alg';
import * as p256Alg from '../alg/p256Alg';
import * as didKeyDriver from './didKeyDriver';

const ed25519Driver = new didKeyDriver.DIDKeyDriver(ed25519Alg.ed25519Alg);
const secp256k1Driver = new didKeyDriver.DIDKeyDriver(
  secp256k1Alg.secp256k1Alg
);
const p256Driver = new didKeyDriver.DIDKeyDriver(p256Alg.p256Alg);

const secp256k1 = new elliptic.ec('secp256k1');
const p256 = new elliptic.ec('p256');

describe('didKeyDriver', () => {
  it('didFromMultibase should work', () => {
    const keyPair = ed25519Driver.generateKeyPair();
    const multibase = ed25519Alg.ed25519Alg.multibaseFromPublicKey(
      keyPair.publicKey
    );
    const result = didKeyDriver.didFromMultibase(multibase);

    expect(result.startsWith('did:key:')).toBeTruthy();
  });

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

  it('keyPairFromSecretKey should work', () => {
    const ed25519KeyPair = ed25519Driver.generateKeyPair();
    const secp256k1KeyPair = secp256k1Driver.generateKeyPair();
    const p256KeyPair = p256Driver.generateKeyPair();

    const ed25519KeyPair2 = ed25519Driver.keyPairFromSecretKey(
      ed25519KeyPair.secretKey
    );
    const secp256k1KeyPair2 = secp256k1Driver.keyPairFromSecretKey(
      secp256k1KeyPair.secretKey
    );
    const p256KeyPair2 = p256Driver.keyPairFromSecretKey(p256KeyPair.secretKey);

    expect(ed25519KeyPair).toEqual(ed25519KeyPair2);
    expect(secp256k1KeyPair).toEqual(secp256k1KeyPair2);
    expect(p256KeyPair).toEqual(p256KeyPair2);
  });

  it('didFromPublicKey should work', () => {
    const ed25519KeyPair = ed25519Driver.generateKeyPair();
    const secp256k1KeyPair = secp256k1Driver.generateKeyPair();
    const p256KeyPair = p256Driver.generateKeyPair();

    expect(
      ed25519Driver
        .didFromPublicKey(ed25519KeyPair.publicKey)
        .startsWith('did:key:z6Mk')
    ).toBeTruthy();
    expect(
      secp256k1Driver
        .didFromPublicKey(secp256k1KeyPair.publicKey)
        .startsWith('did:key:zQ3s')
    ).toBeTruthy();
    expect(
      p256Driver
        .didFromPublicKey(p256KeyPair.publicKey)
        .startsWith('did:key:zDn')
    ).toBeTruthy();
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

  it('issuerFromKeyPair should work', () => {
    const keyPair = ed25519Driver.generateKeyPair();
    const issuer = ed25519Driver.issuerFromKeyPair(keyPair);

    expect(issuer).toBeDefined();
    expect(issuer.did.startsWith('did:key:')).toBeTruthy();
    expect(issuer.signer).toBeDefined();
    expect(issuer.alg).toEqual('EdDSA');
  });

  it('getResolverRegistry for ed25519 should work', async () => {
    const issKeyPair = ed25519Driver.generateKeyPair();
    const audKeyPair = ed25519Driver.generateKeyPair();

    const issDid = ed25519Driver.didFromPublicKey(issKeyPair.publicKey);
    const audDid = ed25519Driver.didFromPublicKey(audKeyPair.publicKey);

    const signer = ed25519Driver.signerFromSecretKey(issKeyPair.secretKey);
    const resolver = new didResolver.Resolver(
      ed25519Driver.getResolverRegistry()
    );

    const payload: didJwt.JWTPayload = {
      aud: audDid,
      name: 'aaa',
    };

    const jwt = await didJwt.createJWT(payload, {
      issuer: issDid,
      alg: 'EdDSA',
      signer,
    });
    const jwtVerifed = await didJwt.verifyJWT(jwt, {
      resolver,
      audience: audDid,
    });

    expect(jwtVerifed.verified).toBeTruthy();
  });

  it('getResolverRegistry for secp256k1 should work', async () => {
    const issKeyPair = secp256k1Driver.generateKeyPair();
    const audKeyPair = secp256k1Driver.generateKeyPair();

    const issDid = secp256k1Driver.didFromPublicKey(issKeyPair.publicKey);
    const audDid = secp256k1Driver.didFromPublicKey(audKeyPair.publicKey);

    const signer = secp256k1Driver.signerFromSecretKey(issKeyPair.secretKey);
    const resolver = new didResolver.Resolver(
      ed25519Driver.getResolverRegistry()
    );

    const payload: didJwt.JWTPayload = {
      aud: audDid,
      name: 'aaa',
    };

    const jwt = await didJwt.createJWT(payload, {
      issuer: issDid,
      alg: 'ES256K',
      signer,
    });
    const jwtVerifed = await didJwt.verifyJWT(jwt, {
      resolver,
      audience: audDid,
    });

    expect(jwtVerifed.verified).toBeTruthy();
  });

  it('getResolverRegistry for p256 should work', async () => {
    const issKeyPair = p256Driver.generateKeyPair();
    const audKeyPair = p256Driver.generateKeyPair();

    const issDid = p256Driver.didFromPublicKey(issKeyPair.publicKey);
    const audDid = p256Driver.didFromPublicKey(audKeyPair.publicKey);

    const signer = p256Driver.signerFromSecretKey(issKeyPair.secretKey);
    const resolver = new didResolver.Resolver(
      ed25519Driver.getResolverRegistry()
    );

    const payload: didJwt.JWTPayload = {
      aud: audDid,
      name: 'aaa',
    };

    const jwt = await didJwt.createJWT(payload, {
      issuer: issDid,
      alg: 'ES256',
      signer,
    });
    const jwtVerifed = await didJwt.verifyJWT(jwt, {
      resolver,
      audience: audDid,
    });

    expect(jwtVerifed.verified).toBeTruthy();
  });
});
