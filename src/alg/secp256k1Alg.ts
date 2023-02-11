import * as elliptic from 'elliptic';
import * as didJwt from 'did-jwt';

import * as types from '../types';
import * as multibaseUtils from '../utils/multibaseUtils';

const secp256k1 = new elliptic.ec('secp256k1');

export const secp256k1Alg: types.Alg = {
  generateKeyPair: (): types.KeyPair => {
    const keyPair = secp256k1.genKeyPair();
    const publicKey = Uint8Array.from(keyPair.getPublic().encodeCompressed());
    const secretKey = Uint8Array.from(keyPair.getPrivate().toArray());

    return { publicKey, secretKey };
  },

  multibaseFromPublicKey: (publicKey: Uint8Array): string => {
    return multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_SECP256K1_PUB_HEADER,
      publicKey
    );
  },

  signerFromSecretKey: (secretKey: Uint8Array): didJwt.Signer => {
    return didJwt.ES256KSigner(secretKey);
  },
};
