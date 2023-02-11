import * as didjwt from 'did-jwt';
import * as ed25519 from '@stablelib/ed25519';

import { TypedJWTDecoded, TypedJWTPayload } from './types';

/**
 * Decodes a JWT and returns a typed and decoded JWT
 *
 * @param jwt - a JWT
 * @returns a typed and decoded JWT
 */
export const decodeJWT = <T>(jwt: string): TypedJWTDecoded<T> => {
  const {
    header,
    payload: originalPayload,
    signature,
    data,
  } = didjwt.decodeJWT(jwt);

  return {
    header,
    payload: originalPayload as TypedJWTPayload<T>,
    signature,
    data,
  };
};
