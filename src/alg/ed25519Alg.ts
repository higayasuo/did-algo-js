import * as ed25519 from '@stablelib/ed25519';
import * as didResolver from 'did-resolver';
import * as didJwt from 'did-jwt';
import * as didJwtVc from 'did-jwt-vc';
import * as u8a from 'uint8arrays';

import * as types from '../types';
import * as didKeyDriver from '../didkey/didKeyDriver';
import * as multibaseUtils from '../utils/multibaseUtils';

export const X25519_2019_CONTEXT =
  'https://w3id.org/security/suites/x25519-2019/v1';

export const ed25519Alg: types.Alg = {
  /**
   * Generates a key pair
   *
   * @returns a key pair
   */
  generateKeyPair: ed25519.generateKeyPair,

  /**
   * Converts the secret key to a key pair
   *
   * @param secretKey - the secret key
   * @returns a key pair
   */
  keyPairFromSecretKey: (secretKey: Uint8Array): types.KeyPair => {
    return {
      publicKey: secretKey.slice(32),
      secretKey,
    };
  },

  /**
   * Converts the public key to a base58btc multibase
   *
   * @param publicKey - the public key
   * @returns a base58btc multibase
   */
  multibaseFromPublicKey: (publicKey: Uint8Array): string => {
    return multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_ED25519_PUB_HEADER,
      publicKey
    );
  },

  /**
   * Converts the base58btc multibase to a public key
   *
   * @param multibase - the base58btc multibase
   * @returns a public key
   */
  publicKeyFromMultibase: (multibase: string): Uint8Array => {
    return multibaseUtils.publicKeyFromMultibase(
      multibaseUtils.MULTICODEC_ED25519_PUB_HEADER,
      multibase
    );
  },

  /**
   * Creates a signer from the secret key
   *
   * @param secretKey
   * @returns a signer
   */
  signerFromSecretKey: (secretKey: Uint8Array): didJwt.Signer => {
    return didJwt.EdDSASigner(secretKey);
  },

  /**
   * Converts the key pair to an issuer
   *
   * @param keyPair - the key pair
   * @returns an issuer
   */
  issuerFromKeyPair: (keyPair: types.KeyPair): didJwtVc.Issuer => {
    return {
      did: didKeyDriver.didFromMultibase(
        ed25519Alg.multibaseFromPublicKey(keyPair.publicKey)
      ),
      signer: ed25519Alg.signerFromSecretKey(keyPair.secretKey),
      alg: 'EdDSA',
    };
  },

  /**
   * Creates a publicKeyJWK object from the public key
   *
   * @param publicKey
   * @returns a publicKeyJwk object
   */
  publicKeyJwkFromPublicKey: (
    publicKey: Uint8Array
  ): didResolver.JsonWebKey => {
    const x = u8a.toString(publicKey, 'base64url');

    return {
      kty: 'OKP',
      crv: 'Ed25519',
      x,
    };
  },

  /**
   * Handles key agreement section
   *
   * @param didDocument - the DID document
   * @returns
   */
  handleKeyAgreement: (didDocument: didResolver.DIDDocument): void => {
    if (Array.isArray(didDocument['@context'])) {
      didDocument['@context'].push(X25519_2019_CONTEXT);
    } else {
      throw new Error(`@context must be string array`);
    }

    if (
      !didDocument.verificationMethod ||
      !didDocument.verificationMethod[0].publicKeyJwk?.x
    ) {
      throw new Error(`public key must be defined`);
    }

    const publicKey = u8a.fromString(
      didDocument.verificationMethod[0].publicKeyJwk?.x,
      'base64url'
    );
    const x25519PublicKey = ed25519.convertPublicKeyToX25519(publicKey);
    const x25519PublicKeyMultibase = multibaseUtils.multibaseFromPublicKey(
      multibaseUtils.MULTICODEC_X25519_PUB_HEADER,
      x25519PublicKey
    );

    didDocument.keyAgreement = [
      {
        id: `${didDocument.id}#${x25519PublicKeyMultibase}`,
        type: 'X25519KeyAgreementKey2019',
        controller: didDocument.id,
        publicKeyBase58: u8a.toString(x25519PublicKey, 'base58btc'),
      },
    ];
  },
};
