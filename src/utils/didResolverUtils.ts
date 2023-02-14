import * as didResolver from 'did-resolver';

import * as errors from '../errors';

/**
 * Returns the did resolution result for error
 *
 * @param error - the error code
 * @param message - the error message
 * @returns the did resolution result for erroor
 */
export const errorDIDResolutionResult = (
  error: string,
  message: string
): didResolver.DIDResolutionResult => {
  return {
    didResolutionMetadata: {
      error,
      message,
    },
    didDocumentMetadata: {},
    didDocument: null,
  };
};

export const errorDIDResolutionResultFromErrorMessage = (
  errorMessage: string
): didResolver.DIDResolutionResult => {
  const pieces = errorMessage.split(':');

  if (pieces.length > 1 && (errors as any)[pieces[0]]) {
    const mes = pieces.slice(1).join(':').trimStart();

    return errorDIDResolutionResult(pieces[0], mes);
  }

  return errorDIDResolutionResult(errors.internalError, errorMessage);
};
