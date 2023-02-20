import { describe, it, expect } from 'vitest';

import * as didJwt from 'did-jwt';

import * as didJwtKit from '.';

describe('did-jwt-toolkit', () => {
  it('getDIDKeyDriver should work', () => {
    expect(didJwtKit.getDIDKeyDriver('EdDSA')).toBeDefined();
  });

  it('createJWT should work', async () => {
    const driver = didJwtKit.getDIDKeyDriver('EdDSA');

    const issuerKeyPair = driver.generateKeyPair();
    const audienceKeyPair = driver.generateKeyPair();

    const issuer = driver.issuerFromKeyPair(issuerKeyPair);
    const audienceDID = driver.didFromPublicKey(audienceKeyPair.publicKey);

    type MyPayload = {
      name: string;
    };

    const payload: didJwtKit.JWTPayload & MyPayload = {
      aud: audienceDID,
      name: 'My name',
    };

    const jwt = await didJwtKit.createJWT(payload, issuer);

    expect(jwt).toBeDefined();
  });

  it('verifyJWT should work', async () => {
    const driver = didJwtKit.getDIDKeyDriver('EdDSA');

    const issuerKeyPair = driver.generateKeyPair();
    const audienceKeyPair = driver.generateKeyPair();

    const issuer = driver.issuerFromKeyPair(issuerKeyPair);
    const audienceDID = driver.didFromPublicKey(audienceKeyPair.publicKey);

    type MyPayload = {
      name: string;
    };

    const payload: didJwtKit.JWTPayload & MyPayload = {
      aud: audienceDID,
      name: 'My name',
    };

    const jwt = await didJwtKit.createJWT(payload, issuer);

    const resolver = new didJwtKit.Resolver(driver.getResolverRegistry());

    const verifiedJWT = await didJwtKit.verifyJWT<MyPayload>(jwt, resolver, {
      audience: audienceDID,
    });

    expect(verifiedJWT).toBeDefined();
    expect(verifiedJWT.payload.name).toEqual('My name');
  });
});
