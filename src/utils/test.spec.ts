import { describe, it, expect } from 'vitest';
import * as u8a from 'uint8arrays';
import * as varint from 'varint';
import * as ed25519 from '@stablelib/ed25519';
import * as elliptic from 'elliptic';

const secp256k1 = new elliptic.ec('secp256k1');
const p256 = new elliptic.ec('p256');

describe('test', () => {
  it('test should work', () => {
    const header = Uint8Array.from(varint.encode(0xed));
    console.log(header);

    const keyPair = ed25519.generateKeyPair();
    const mbKey = new Uint8Array(header.length + keyPair.publicKey.length);
    mbKey.set(header, 0);
    mbKey.set(keyPair.publicKey, header.length);
    console.log(Uint8Array.from(varint.encode(0xe7)));
    console.log(varint.encode(0x1200));
  });
});
