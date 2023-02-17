import { describe, it, expect } from 'vitest';

import * as didKit from '.';

describe('did-jwt-toolkit', () => {
  it('getDIDKeyDriver should work', () => {
    expect(didKit.getDIDKeyDriver('EdDSA')).toBeDefined();
  });

  it('createJWT should work', () => {
    const driver = didKit.getDIDKeyDriver('EdDSA');

    const issuerKeyPair = driver.generateKeyPair();
    const audienceKeyPair = driver.generateKeyPair();

    const issuerDID = driver.didFromPublicKey(issuerKeyPair.publicKey);
    const audienceDID = driver.didFromPublicKey(audienceKeyPair.publicKey);

    const issuerSigner = driver.signerFromSecretKey(issuerKeyPair.secretKey);

    type MyPayload = didKit.JWTPayload & {
      name: string;
    };

    const payload: MyPayload = {
      aud: audienceDID,
      name: 'My name',
    };
    const options: didKit.JWTOptions = {
      issuer: issuerDID,
      signer: issuerSigner,
    };
    const header: didKit.JWTHeader = {
      alg: 'EdDSA',
    };

    expect(didKit.createJWT(payload, options, header)).toBeDefined();
  });
});
