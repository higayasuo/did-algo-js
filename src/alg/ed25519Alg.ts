import * as ed25519 from '@stablelib/ed25519';
import * as didJwt from 'did-jwt';

import * as types from '../types';
import * as multibaseUtils from '../utils/multibaseUtils';

export const ed25519Alg: types.Alg = {
  generateKeyPair: ed25519.generateKeyPair,

  multibaseFromPublicKey: (publicKey: Uint8Array): string => {
    return multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_ED25519_PUB_HEADER,
      publicKey
    );
  },

  signerFromSecretKey: (secretKey: Uint8Array): didJwt.Signer => {
    return didJwt.EdDSASigner(secretKey);
  },
};
