import * as didResolver from 'did-resolver';

import * as errors from '../errors';

export const createDIDDocument = (parsedDID: didResolver.ParsedDID): didResolver.DIDDocument => {
  if (parsedDID.method !== 'key') {
    throw new Error(`${errors.methodNotSupported}: The method must be "key", but ${parsedDID.method}
  }
}
