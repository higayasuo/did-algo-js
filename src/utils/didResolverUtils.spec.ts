import { describe, it, expect } from 'vitest';

import * as didResolver from 'did-resolver';

import * as errors from '../errors';
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

  it('errorDIDResolutionResultFromErrorMessage for known error code should work', () => {
    const error = errors.invalidDid;
    const message = 'hoge: aaa';
    const errorMessage = `${error}: ${message}`;

    const actualResult =
      didResolverUtils.errorDIDResolutionResultFromErrorMessage(errorMessage);
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

  it('errorDIDResolutionResultFromErrorMessage for unknown error message should work', () => {
    const errorMessage = 'hoge: aaa';

    const actualResult =
      didResolverUtils.errorDIDResolutionResultFromErrorMessage(errorMessage);
    const expectedResult: didResolver.DIDResolutionResult = {
      didResolutionMetadata: {
        error: errors.internalError,
        message: errorMessage,
      },
      didDocumentMetadata: {},
      didDocument: null,
    };

    expect(actualResult).toEqual(expectedResult);
  });
});
