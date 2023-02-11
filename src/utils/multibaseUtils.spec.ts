import { describe, it, expect } from 'vitest';

import * as ed25519 from '@stablelib/ed25519';
import * as elliptic from 'elliptic';

import * as multibaseUtils from './multibaseUtils';

const secp256k1 = new elliptic.ec('secp256k1');
const p256 = new elliptic.ec('p256');

describe('multibaseUtils', () => {
  it('multibaseFromPublicKey should work', () => {
    const ed25519PublicKey = ed25519.generateKeyPair().publicKey;
    const secp256k1PublicKey = Uint8Array.from(
      secp256k1.genKeyPair().getPublic().encodeCompressed()
    );
    const p256PublicKey = Uint8Array.from(
      p256.genKeyPair().getPublic().encodeCompressed()
    );

    expect(
      multibaseUtils
        .multibaseFromPublicKey(
          multibaseUtils.MULTICODEC_ED25519_PUB_HEADER,
          ed25519PublicKey
        )
        .startsWith(multibaseUtils.MULTIBASE_BASE58BTC_ED25519_PREFIX)
    ).to.be.true;
    expect(
      multibaseUtils
        .multibaseFromPublicKey(
          multibaseUtils.MULTICODEC_SECP256K1_PUB_HEADER,
          secp256k1PublicKey
        )
        .startsWith(multibaseUtils.MULTIBASE_BASE58BTC_SECP256K1_PREFIX)
    ).to.be.true;
    expect(
      multibaseUtils
        .multibaseFromPublicKey(
          multibaseUtils.MULTICODEC_P256_PUB_HEADER,
          p256PublicKey
        )
        .startsWith(multibaseUtils.MULTIBASE_BASE58BTC_P256_PREFIX)
    ).to.be.true;
  });

  it('getMulticodecHeader should work', () => {
    const ed25519PublicKey = ed25519.generateKeyPair().publicKey;
    const secp256k1PublicKey = Uint8Array.from(
      secp256k1.genKeyPair().getPublic().encodeCompressed()
    );
    const p256PublicKey = Uint8Array.from(
      p256.genKeyPair().getPublic().encodeCompressed()
    );

    const ed25519Multibase = multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_ED25519_PUB_HEADER,
      ed25519PublicKey
    );
    const secp256k1Multibase = multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_SECP256K1_PUB_HEADER,
      secp256k1PublicKey
    );
    const p256Multibase = multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_P256_PUB_HEADER,
      p256PublicKey
    );

    expect(multibaseUtils.getMulticodecHeader(ed25519Multibase)).to.eq(
      multibaseUtils.MULTICODEC_ED25519_PUB_HEADER
    );
    expect(multibaseUtils.getMulticodecHeader(secp256k1Multibase)).to.eq(
      multibaseUtils.MULTICODEC_SECP256K1_PUB_HEADER
    );
    expect(multibaseUtils.getMulticodecHeader(p256Multibase)).to.eq(
      multibaseUtils.MULTICODEC_P256_PUB_HEADER
    );

    expect(() => multibaseUtils.getMulticodecHeader('invalid')).to.throw(
      'unsupportedPublicKeyType:The multibase must start with either z6Mk, zQ3s, or zDn, but invalid'
    );
  });

  it('publicKeyFromMultibase should work', () => {
    const ed25519PublicKey = ed25519.generateKeyPair().publicKey;
    const secp256k1PublicKey = Uint8Array.from(
      secp256k1.genKeyPair().getPublic().encodeCompressed()
    );
    const p256PublicKey = Uint8Array.from(
      p256.genKeyPair().getPublic().encodeCompressed()
    );

    const ed25519Multibase = multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_ED25519_PUB_HEADER,
      ed25519PublicKey
    );
    const secp256k1Multibase = multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_SECP256K1_PUB_HEADER,
      secp256k1PublicKey
    );
    const p256Multibase = multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_P256_PUB_HEADER,
      p256PublicKey
    );

    expect(multibaseUtils.publicKeyFromMultibase(ed25519Multibase)).to.eql(
      ed25519PublicKey
    );
    expect(multibaseUtils.publicKeyFromMultibase(secp256k1Multibase)).to.eql(
      secp256k1PublicKey
    );
    expect(multibaseUtils.publicKeyFromMultibase(p256Multibase)).to.eql(
      p256PublicKey
    );

    expect(() => multibaseUtils.getMulticodecHeader('invalid')).to.throw(
      'unsupportedPublicKeyType:The multibase must start with either z6Mk, zQ3s, or zDn, but invalid'
    );
  });
});
