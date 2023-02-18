import { describe, it, expect } from 'vitest';

import * as didJwtKit from '.';

describe('did-jwt-toolkit', () => {
  it('getDIDKeyDriver should work', () => {
    expect(didJwtKit.getDIDKeyDriver('EdDSA')).toBeDefined();
  });

  it('createJWT should work', () => {
    const driver = didJwtKit.getDIDKeyDriver('EdDSA');

    const issuerKeyPair = driver.generateKeyPair();
    const audienceKeyPair = driver.generateKeyPair();

    const issuerDID = driver.didFromPublicKey(issuerKeyPair.publicKey);
    const audienceDID = driver.didFromPublicKey(audienceKeyPair.publicKey);

    const issuerSigner = driver.signerFromSecretKey(issuerKeyPair.secretKey);

    type MyPayload = didJwtKit.JWTPayload & {
      name: string;
    };

    const payload: MyPayload = {
      aud: audienceDID,
      name: 'My name',
    };
    const options: didJwtKit.JWTOptions = {
      issuer: issuerDID,
      signer: issuerSigner,
    };
    const header: didJwtKit.JWTHeader = {
      alg: 'EdDSA',
    };

    expect(didJwtKit.createJWT(payload, options, header)).toBeDefined();
  });

  it('verifyJWT should work', async () => {
    const driver = didJwtKit.getDIDKeyDriver('EdDSA');

    const issuerKeyPair = driver.generateKeyPair();
    const audienceKeyPair = driver.generateKeyPair();

    const issuerDID = driver.didFromPublicKey(issuerKeyPair.publicKey);
    const audienceDID = driver.didFromPublicKey(audienceKeyPair.publicKey);

    const issuerSigner = driver.signerFromSecretKey(issuerKeyPair.secretKey);

    type MyPayload = didJwtKit.JWTPayload & {
      name: string;
    };

    const payload: MyPayload = {
      aud: audienceDID,
      name: 'My name',
    };
    const options: didJwtKit.JWTOptions = {
      issuer: issuerDID,
      signer: issuerSigner,
    };
    const header: didJwtKit.JWTHeader = {
      alg: 'EdDSA',
    };

    const jwt = await didJwtKit.createJWT(payload, options, header);

    const resolver = new didJwtKit.Resolver(driver.getResolverRegistry());
    const verifyOptions: didJwtKit.JWTVerifyOptions = {
      resolver,
      audience: audienceDID,
    };
    const jwtVerified = await didJwtKit.verifyJWT<MyPayload>(
      jwt,
      verifyOptions
    );

    expect(jwtVerified).toBeDefined();
    expect(jwtVerified.payload.name).toEqual('My name');
  });
});
