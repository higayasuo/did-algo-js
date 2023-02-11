import * as didResolver from 'did-resolver';

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
