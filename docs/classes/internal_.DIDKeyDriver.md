[did-jwt-toolkit](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / DIDKeyDriver

# Class: DIDKeyDriver

[<internal>](../modules/internal_.md).DIDKeyDriver

The driver for did:key

## Table of contents

### Constructors

- [constructor](internal_.DIDKeyDriver.md#constructor)

### Properties

- [#alg](internal_.DIDKeyDriver.md##alg)

### Methods

- [didFromPublicKey](internal_.DIDKeyDriver.md#didfrompublickey)
- [generateKeyPair](internal_.DIDKeyDriver.md#generatekeypair)
- [getResolverRegistry](internal_.DIDKeyDriver.md#getresolverregistry)
- [issuerFromKeyPair](internal_.DIDKeyDriver.md#issuerfromkeypair)
- [keyPairFromSecretKey](internal_.DIDKeyDriver.md#keypairfromsecretkey)
- [signerFromSecretKey](internal_.DIDKeyDriver.md#signerfromsecretkey)

## Constructors

### constructor

• **new DIDKeyDriver**(`alg`)

Constructor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alg` | [`Alg`](../interfaces/internal_.Alg.md) | the crypto algorithm |

#### Defined in

[didkey/didKeyDriver.ts:28](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/didkey/didKeyDriver.ts#L28)

## Properties

### #alg

• `Private` **#alg**: [`Alg`](../interfaces/internal_.Alg.md)

#### Defined in

[didkey/didKeyDriver.ts:22](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/didkey/didKeyDriver.ts#L22)

## Methods

### didFromPublicKey

▸ **didFromPublicKey**(`publicKey`): `string`

Converts the public key to a DID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `Uint8Array` | the public key |

#### Returns

`string`

a DID

#### Defined in

[didkey/didKeyDriver.ts:57](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/didkey/didKeyDriver.ts#L57)

___

### generateKeyPair

▸ **generateKeyPair**(): [`KeyPair`](../modules/internal_.md#keypair)

Generates a key pair

#### Returns

[`KeyPair`](../modules/internal_.md#keypair)

a key pair

#### Defined in

[didkey/didKeyDriver.ts:37](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/didkey/didKeyDriver.ts#L37)

___

### getResolverRegistry

▸ **getResolverRegistry**(): `ResolverRegistry`

Returns a resolver registry for did:key

#### Returns

`ResolverRegistry`

a resolver registry for did:key

#### Defined in

[didkey/didKeyDriver.ts:86](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/didkey/didKeyDriver.ts#L86)

___

### issuerFromKeyPair

▸ **issuerFromKeyPair**(`keyPair`): `Issuer`

Converts the key pair to an issuer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyPair` | [`KeyPair`](../modules/internal_.md#keypair) | the key pair |

#### Returns

`Issuer`

an issuer

#### Defined in

[didkey/didKeyDriver.ts:77](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/didkey/didKeyDriver.ts#L77)

___

### keyPairFromSecretKey

▸ **keyPairFromSecretKey**(`secretKey`): [`KeyPair`](../modules/internal_.md#keypair)

Converts the secret key to a key pair

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretKey` | `Uint8Array` | the secret key |

#### Returns

[`KeyPair`](../modules/internal_.md#keypair)

a key pair

#### Defined in

[didkey/didKeyDriver.ts:47](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/didkey/didKeyDriver.ts#L47)

___

### signerFromSecretKey

▸ **signerFromSecretKey**(`secretKey`): `Signer`

Converts the secret key to a signer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretKey` | `Uint8Array` | the secret key |

#### Returns

`Signer`

a signer

#### Defined in

[didkey/didKeyDriver.ts:67](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/didkey/didKeyDriver.ts#L67)
