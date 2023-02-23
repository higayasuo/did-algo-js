[did-jwt-toolkit](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / Alg

# Interface: Alg

[<internal>](../modules/internal_.md).Alg

crypto algorithm

## Table of contents

### Properties

- [generateKeyPair](internal_.Alg.md#generatekeypair)
- [issuerFromKeyPair](internal_.Alg.md#issuerfromkeypair)
- [keyPairFromSecretKey](internal_.Alg.md#keypairfromsecretkey)
- [multibaseFromPublicKey](internal_.Alg.md#multibasefrompublickey)
- [publicKeyFromMultibase](internal_.Alg.md#publickeyfrommultibase)
- [publicKeyJwkFromPublicKey](internal_.Alg.md#publickeyjwkfrompublickey)
- [signerFromSecretKey](internal_.Alg.md#signerfromsecretkey)

## Properties

### generateKeyPair

• **generateKeyPair**: () => [`KeyPair`](../modules/internal_.md#keypair)

#### Type declaration

▸ (): [`KeyPair`](../modules/internal_.md#keypair)

Generates a key pair

##### Returns

[`KeyPair`](../modules/internal_.md#keypair)

a key pair

#### Defined in

[types.ts:267](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/types.ts#L267)

___

### issuerFromKeyPair

• **issuerFromKeyPair**: (`keyPair`: [`KeyPair`](../modules/internal_.md#keypair)) => `Issuer`

#### Type declaration

▸ (`keyPair`): `Issuer`

Converts the key pair to an issuer

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyPair` | [`KeyPair`](../modules/internal_.md#keypair) | the key pair |

##### Returns

`Issuer`

an issuer

#### Defined in

[types.ts:307](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/types.ts#L307)

___

### keyPairFromSecretKey

• **keyPairFromSecretKey**: (`secretKey`: `Uint8Array`) => [`KeyPair`](../modules/internal_.md#keypair)

#### Type declaration

▸ (`secretKey`): [`KeyPair`](../modules/internal_.md#keypair)

Converts the secret key to a key pair

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretKey` | `Uint8Array` | the secret key |

##### Returns

[`KeyPair`](../modules/internal_.md#keypair)

a key pair

#### Defined in

[types.ts:275](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/types.ts#L275)

___

### multibaseFromPublicKey

• **multibaseFromPublicKey**: (`publicKey`: `Uint8Array`) => `string`

#### Type declaration

▸ (`publicKey`): `string`

Converts the public key to a base58btc multibase

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `Uint8Array` | the public key |

##### Returns

`string`

a base58btc multibase

#### Defined in

[types.ts:283](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/types.ts#L283)

___

### publicKeyFromMultibase

• **publicKeyFromMultibase**: (`multibase`: `string`) => `Uint8Array`

#### Type declaration

▸ (`multibase`): `Uint8Array`

Converts the base58btc multibase to a public key

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `multibase` | `string` | the base58btc multibase |

##### Returns

`Uint8Array`

a public key

#### Defined in

[types.ts:291](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/types.ts#L291)

___

### publicKeyJwkFromPublicKey

• **publicKeyJwkFromPublicKey**: (`publicKey`: `Uint8Array`) => `JsonWebKey`

#### Type declaration

▸ (`publicKey`): `JsonWebKey`

Creates the publicKeyJWK object from the public key

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `Uint8Array` | the public key |

##### Returns

`JsonWebKey`

a publicKeyJwk object

#### Defined in

[types.ts:315](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/types.ts#L315)

___

### signerFromSecretKey

• **signerFromSecretKey**: (`secretKey`: `Uint8Array`) => `Signer`

#### Type declaration

▸ (`secretKey`): `Signer`

Creates a signer from the secret key

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretKey` | `Uint8Array` | the secret key |

##### Returns

`Signer`

a signer

#### Defined in

[types.ts:299](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/types.ts#L299)
