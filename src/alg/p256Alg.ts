import * as elliptic from 'elliptic';
import * as didJwt from 'did-jwt';

import * as types from '../types';
import * as multibaseUtils from '../utils/multibaseUtils';

const p256 = new elliptic.ec('p256');

export const p256Alg: types.Alg = {
  generateKeyPair: (): types.KeyPair => {
    const keyPair = p256.genKeyPair();
    const publicKey = Uint8Array.from(keyPair.getPublic().encodeCompressed());
    const secretKey = Uint8Array.from(keyPair.getPrivate().toArray());

    return { publicKey, secretKey };
  },

  multibaseFromPublicKey: (publicKey: Uint8Array): string => {
    return multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_P256_PUB_HEADER,
      publicKey
    );
  },

  signerFromSecretKey: (secretKey: Uint8Array): didJwt.Signer => {
    return didJwt.ES256Signer(secretKey);
  },
};
