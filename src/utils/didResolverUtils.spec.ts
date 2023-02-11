import { describe, it, expect } from 'vitest';

import * as didResolver from 'did-resolver';

import * as didResolverUtils from './didResolverUtils';

describe('didResolverUtils', () => {
  it('errorDIDResolutionResult should work', () => {
    const error = 'aaa';
    const message = 'hoge';
    const actualResult = didResolverUtils.errorDIDResolutionResult(
      error,
      message
    );
    const expectedResult: didResolver.DIDResolutionResult = {
      didResolutionMetadata: {
        error,
        message,
      },
      didDocumentMetadata: {},
      didDocument: null,
    };

    expect(actualResult).toEqual(expectedResult);
  });
});
