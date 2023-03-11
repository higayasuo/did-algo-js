import { describe, it, expect } from 'vitest';

import * as didJwt from 'did-jwt';
import * as x25519 from '@stablelib/x25519';
import * as ed25519 from '@stablelib/ed25519';
import * as u8a from 'uint8arrays';

type MyCredential = {
  name: string;
};

type Revocable = {
  appIndex: number;
};

describe('JWE test', () => {
  it('xc20pDir should work', async () => {
    const keyPair = x25519.generateKeyPair();

    const encrypter = didJwt.xc20pDirEncrypter(keyPair.secretKey);
    const decrepter = didJwt.xc20pDirDecrypter(keyPair.secretKey);

    const cleartext = u8a.fromString('Hello');

    const encryptionResult = await encrypter.encrypt(cleartext, {});
    const sealed = u8a.concat([
      encryptionResult.ciphertext,
      encryptionResult.tag,
    ]);
    const aad = u8a.fromString(
      encryptionResult.protectedHeader as string,
      'utf-8'
    );
    //console.log(encryptionResult);

    const decryptionResult = await decrepter.decrypt(
      sealed,
      encryptionResult.iv,
      aad
    );
    //console.log('decryptionResult:', decryptionResult);

    expect(cleartext).toEqual(decryptionResult);

    const jwe = await didJwt.createJWE(cleartext, [encrypter]);

    expect(cleartext).toEqual(await didJwt.decryptJWE(jwe, decrepter));
  });

  it('anon should work', async () => {
    const keyPair = x25519.generateKeyPair();

    const encrypter = didJwt.createAnonEncrypter(keyPair.publicKey);
    const decrepter = didJwt.createAnonDecrypter(keyPair.secretKey);

    const cleartext = u8a.fromString('Hello');

    const encryptionResult = await encrypter.encrypt(cleartext, {});
    const sealed = u8a.concat([
      encryptionResult.ciphertext,
      encryptionResult.tag,
    ]);
    const aad = u8a.fromString(
      encryptionResult.protectedHeader as string,
      'utf-8'
    );
    //console.log(JSON.stringify(encryptionResult, undefined, 2));

    const decryptionResult = await decrepter.decrypt(
      sealed,
      encryptionResult.iv,
      aad,
      encryptionResult.recipient
    );
    //console.log('decryptionResult:', decryptionResult);

    expect(cleartext).toEqual(decryptionResult);

    const jwe = await didJwt.createJWE(cleartext, [encrypter]);

    expect(cleartext).toEqual(await didJwt.decryptJWE(jwe, decrepter));
  });

  it('auth should work', async () => {
    const senderKeyPair = x25519.generateKeyPair();
    const recipientKeyPair = x25519.generateKeyPair();

    const encrypter = didJwt.createAuthEncrypter(
      recipientKeyPair.publicKey,
      senderKeyPair.secretKey
    );
    const decrepter = didJwt.createAuthDecrypter(
      recipientKeyPair.secretKey,
      senderKeyPair.publicKey
    );

    const cleartext = u8a.fromString('Hello');

    const encryptionResult = await encrypter.encrypt(cleartext, {});
    const sealed = u8a.concat([
      encryptionResult.ciphertext,
      encryptionResult.tag,
    ]);
    const aad = u8a.fromString(
      encryptionResult.protectedHeader as string,
      'utf-8'
    );
    //console.log(JSON.stringify(encryptionResult, undefined, 2));

    const decryptionResult = await decrepter.decrypt(
      sealed,
      encryptionResult.iv,
      aad,
      encryptionResult.recipient
    );
    //console.log('decryptionResult:', decryptionResult);

    expect(cleartext).toEqual(decryptionResult);

    const jwe = await didJwt.createJWE(cleartext, [encrypter]);

    expect(cleartext).toEqual(await didJwt.decryptJWE(jwe, decrepter));
  });
});
