import { describe, it, expect } from 'vitest';

import * as ed25519 from '@stablelib/ed25519';
import * as elliptic from 'elliptic';
import * as didResolver from 'did-resolver';

import * as alg from '../alg';
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

    expect(
      multibaseUtils.publicKeyFromMultibase(
        multibaseUtils.MULTICODEC_ED25519_PUB_HEADER,
        ed25519Multibase
      )
    ).to.eql(ed25519PublicKey);
    expect(
      multibaseUtils.publicKeyFromMultibase(
        multibaseUtils.MULTICODEC_SECP256K1_PUB_HEADER,
        secp256k1Multibase
      )
    ).to.eql(secp256k1PublicKey);
    expect(
      multibaseUtils.publicKeyFromMultibase(
        multibaseUtils.MULTICODEC_P256_PUB_HEADER,
        p256Multibase
      )
    ).to.eql(p256PublicKey);

    expect(() =>
      multibaseUtils.publicKeyFromMultibase(Uint8Array.from([]), 'a')
    ).to.throw(
      'invalidMultibaseHeader: The multibase must start with z, but a'
    );
    expect(() =>
      multibaseUtils.publicKeyFromMultibase(
        multibaseUtils.MULTICODEC_ED25519_PUB_HEADER,
        p256Multibase
      )
    ).to.throw('The multicodec must start with [237,1], but [128,36]');
  });

  it('algFromMultibase should work', () => {
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

    expect(multibaseUtils.algFromMultibase(ed25519Multibase)).to.eq(
      alg.ed25519Alg
    );
    expect(multibaseUtils.algFromMultibase(secp256k1Multibase)).to.eq(
      alg.secp256k1Alg
    );
    expect(multibaseUtils.algFromMultibase(p256Multibase)).to.eq(alg.p256Alg);

    expect(() => multibaseUtils.algFromMultibase('invalid')).to.throw(
      'unsupportedPublicKeyType: The multibase must start with either z6Mk, zQ3s, or zDn, but invalid'
    );
  });

  it('test should work', () => {
    const parsed = didResolver.parse('did:key:1234?aaa=1#abc');

    console.log(parsed);
  });
});
