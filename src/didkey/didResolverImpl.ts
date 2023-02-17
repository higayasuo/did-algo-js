import * as didResolver from 'did-resolver';

import * as didResolverUtils from '../utils/didResolverUtils';
import * as multibaseUtils from '../utils/multibaseUtils';
import * as errors from '../errors';

/**
 * the did resolver function
 *
 * @param did - the DID
 * @param parsed - the parsed DID
 * @param resolver - the resolver
 * @param options - the resolver options
 * @returns a DID resolution result
 */
export const resolver: didResolver.DIDResolver = async (
  did,
  parsed,
  resolver,
  options
): Promise<didResolver.DIDResolutionResult> => {
  try {
    if (parsed.method !== 'key') {
      return didResolverUtils.errorDIDResolutionResult(
        errors.methodNotSupported,
        `The method must be "key", but "${parsed.method}"`
      );
    }

    const alg = multibaseUtils.algFromMultibase(parsed.id);
    const publicKey = alg.publicKeyFromMultibase(parsed.id);
    const publicKeyJwk = alg.publicKeyJwkFromPublicKey(publicKey);
    const verificationMethodId = `${parsed.did}#${parsed.id}`;

    const didDocument: didResolver.DIDDocument = {
      '@context': [
        'https://www.w3.org/ns/did/v1',
        'https://w3id.org/security/suites/jws-2020/v1',
      ],
      id: parsed.did,
      verificationMethod: [
        {
          id: verificationMethodId,
          type: 'JsonWebKey2020',
          controller: parsed.did,
          publicKeyJwk,
        },
      ],
      authentication: [verificationMethodId],
      assertionMethod: [verificationMethodId],
      capabilityDelegation: [verificationMethodId],
      capabilityInvocation: [verificationMethodId],
    };

    return {
      didResolutionMetadata: {
        contentType: 'application/did+ld+json',
      },
      didDocumentMetadata: {},
      didDocument,
    };
  } catch (e: any) {
    return didResolverUtils.errorDIDResolutionResultFromErrorMessage(e.message);
  }
};
