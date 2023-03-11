import { describe, it, expect } from 'vitest';

import * as ed25519 from '@stablelib/ed25519';
import * as didResolver from 'did-resolver';
import * as u8a from 'uint8arrays';

import * as multibaseUtils from '../utils/multibaseUtils';
import { ed25519Alg, X25519_2019_CONTEXT } from './ed25519Alg';

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

  it('issuerFromKeyKeyPair should work', async () => {
    const keyPair = ed25519Alg.generateKeyPair();
    const issuer = ed25519Alg.issuerFromKeyPair(keyPair);

    expect(issuer).to.toBeDefined();
    expect(issuer.did.startsWith('did:key:')).toBeTruthy();
    expect(issuer.signer).toBeDefined();
    expect(issuer.alg).toEqual('EdDSA');

    const message = u8a.fromString('hello', 'utf-8');
    const signature = u8a.fromString(
      (await issuer.signer(message)) as string,
      'base64url'
    );

    expect(ed25519.verify(keyPair.publicKey, message, signature)).toBeTruthy();
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

  it('handleKeyAgreement should work', async () => {
    const keyPair = ed25519Alg.generateKeyPair();
    const publicKeyMultibase = ed25519Alg.multibaseFromPublicKey(
      keyPair.publicKey
    );
    const x25519PublicKey = ed25519.convertPublicKeyToX25519(keyPair.publicKey);
    const x25519PublicKeyMultibase = multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_X25519_PUB_HEADER,
      x25519PublicKey
    );
    const did = `did:key:${publicKeyMultibase}`;
    const publicKeyJwk = ed25519Alg.publicKeyJwkFromPublicKey(
      keyPair.publicKey
    );

    const verificationMethodId = `${did}#${publicKeyMultibase}`;

    const didDocument: didResolver.DIDDocument = {
      '@context': [
        'https://www.w3.org/ns/did/v1',
        'https://w3id.org/security/suites/jws-2020/v1',
      ],
      id: did,
      verificationMethod: [
        {
          id: verificationMethodId,
          type: 'JsonWebKey2020',
          controller: did,
          publicKeyJwk,
        },
      ],
      authentication: [verificationMethodId],
      assertionMethod: [verificationMethodId],
      capabilityDelegation: [verificationMethodId],
      capabilityInvocation: [verificationMethodId],
    };

    ed25519Alg.handleKeyAgreement(didDocument);
    //console.log(didDocument);

    expect(didDocument['@context']?.length).toEqual(3);
    expect(didDocument['@context']?.[2]).toEqual(X25519_2019_CONTEXT);
    expect(didDocument.keyAgreement).toEqual([
      {
        id: `${did}#${x25519PublicKeyMultibase}`,
        type: 'X25519KeyAgreementKey2019',
        controller: did,
        publicKeyBase58: u8a.toString(x25519PublicKey, 'base58btc'),
      },
    ]);
  });
});
