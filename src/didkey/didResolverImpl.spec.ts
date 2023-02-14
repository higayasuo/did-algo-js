import { describe, it, expect } from 'vitest';

import * as didResolver from 'did-resolver';
import * as u8a from 'uint8arrays';

import * as errors from '../errors';
import * as didResolverImpl from './didResolverImpl';
import { ed25519Driver } from '.';

describe('didResolverImpl', () => {
  it('resolver should return errr did resolution result when method is not key', async () => {
    const did = 'did:hoge:1234';
    const parsedDID = didResolver.parse(did) as didResolver.ParsedDID;
    const message = 'The method must be "key", but "hoge"';

    const actualResult = await didResolverImpl.resolver(
      did,
      parsedDID,
      new didResolver.Resolver(),
      {}
    );
    const expectedResult: didResolver.DIDResolutionResult = {
      didResolutionMetadata: {
        error: errors.methodNotSupported,
        message,
      },
      didDocumentMetadata: {},
      didDocument: null,
    };

    expect(actualResult).to.eql(expectedResult);
  });

  it('resolver should return proper did resolution result', async () => {
    const keyPair = ed25519Driver.generateKeyPair();
    const did = ed25519Driver.didFromPublicKey(keyPair.publicKey);
    const parsedDID = didResolver.parse(did) as didResolver.ParsedDID;
    const verificationMethodId = `${did}#${parsedDID.id}`;

    const actualResult = await didResolverImpl.resolver(
      did,
      parsedDID,
      new didResolver.Resolver(),
      {}
    );
    const expectedResult: didResolver.DIDResolutionResult = {
      didResolutionMetadata: {
        contentType: 'application/did+ld+json',
      },
      didDocumentMetadata: {},
      didDocument: {
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
            publicKeyJwk: {
              kty: 'OKP',
              crv: 'Ed25519',
              x: u8a.toString(keyPair.publicKey, 'base64url'),
            },
          },
        ],
        authentication: [verificationMethodId],
        assertionMethod: [verificationMethodId],
        capabilityDelegation: [verificationMethodId],
        capabilityInvocation: [verificationMethodId],
      },
    };

    expect(actualResult).to.toEqual(expectedResult);
  });
});
