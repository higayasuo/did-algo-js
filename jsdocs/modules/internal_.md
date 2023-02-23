[did-jwt-toolkit](../README.md) / [Exports](../modules.md) / <internal\>

# Module: <internal\>

## Table of contents

### Classes

- [DIDKeyDriver](../classes/internal_.DIDKeyDriver.md)

### Interfaces

- [Alg](../interfaces/internal_.Alg.md)
- [CredentialStatus](../interfaces/internal_.CredentialStatus.md)

### Type Aliases

- [AlgName](internal_.md#algname)
- [CreateCredentialJWTOptions](internal_.md#createcredentialjwtoptions)
- [CreateJWTOptions](internal_.md#createjwtoptions)
- [CreatePresentationJWTOptions](internal_.md#createpresentationjwtoptions)
- [CredentialJWTPayload](internal_.md#credentialjwtpayload)
- [CredentialSubject](internal_.md#credentialsubject)
- [Extensible](internal_.md#extensible)
- [Issuer](internal_.md#issuer)
- [JWTHeader](internal_.md#jwtheader)
- [JWTPayload](internal_.md#jwtpayload)
- [KeyPair](internal_.md#keypair)
- [PresentationJWTPayload](internal_.md#presentationjwtpayload)
- [Proof](internal_.md#proof)
- [Replace](internal_.md#replace)
- [VC](internal_.md#vc)
- [VP](internal_.md#vp)
- [Verifiable](internal_.md#verifiable)
- [VerifiableCredential](internal_.md#verifiablecredential)
- [VerifiedCredentialJWT](internal_.md#verifiedcredentialjwt)
- [VerifiedJWT](internal_.md#verifiedjwt)
- [VerifiedPresentationJWT](internal_.md#verifiedpresentationjwt)
- [VerifyCredentialJWTOptions](internal_.md#verifycredentialjwtoptions)
- [VerifyJWTOptions](internal_.md#verifyjwtoptions)
- [VerifyPresentationJWTOptions](internal_.md#verifypresentationjwtoptions)
- [W3CCredential](internal_.md#w3ccredential)
- [W3CPresentation](internal_.md#w3cpresentation)

## Type Aliases

### AlgName

Ƭ **AlgName**: ``"EdDSA"`` \| ``"ES256K"`` \| ``"ES256"``

#### Defined in

[types.ts:5](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L5)

___

### CreateCredentialJWTOptions

Ƭ **CreateCredentialJWTOptions**: `didJwtVc.CreateCredentialOptions`

Represents the creation options that can be passed to the createCredentialJWT method.

#### Defined in

[types.ts:188](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L188)

___

### CreateJWTOptions

Ƭ **CreateJWTOptions**: `Partial`<`didJwt.JWTOptions`\> & { `header?`: [`JWTHeader`](internal_.md#jwtheader)  }

the options for createJWT

#### Defined in

[types.ts:181](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L181)

___

### CreatePresentationJWTOptions

Ƭ **CreatePresentationJWTOptions**: `didJwtVc.CreatePresentationOptions`

Represents the creation options that can be passed to the createPresentationJWT method.

#### Defined in

[types.ts:193](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L193)

___

### CredentialJWTPayload

Ƭ **CredentialJWTPayload**<`T`\>: `Object`

A JWT payload representation of a Credential

**`See`**

https://www.w3.org/TR/vc-data-model/#jwt-encoding

#### Type parameters

| Name |
| :------ |
| `T` |

#### Index signature

▪ [x: `string`]: `any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `aud?` | `string` \| `string`[] |
| `exp?` | `number` |
| `iss?` | `string` |
| `jti?` | `string` |
| `nbf?` | `number` |
| `sub` | `string` |
| `vc` | [`VC`](internal_.md#vc)<`T`\> |

#### Defined in

[types.ts:148](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L148)

___

### CredentialSubject

Ƭ **CredentialSubject**: [`Extensible`](internal_.md#extensible)<{ `id?`: `string`  }\>

#### Defined in

[types.ts:54](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L54)

___

### Extensible

Ƭ **Extensible**<`T`\>: `T` & { `[x: string]`: `any`;  }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:37](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L37)

___

### Issuer

Ƭ **Issuer**: `didJwtVc.Issuer`

the issuer

#### Defined in

[types.ts:47](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L47)

___

### JWTHeader

Ƭ **JWTHeader**: `Partial`<`didJwt.JWTHeader`\>

the JWT header

#### Defined in

[types.ts:42](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L42)

___

### JWTPayload

Ƭ **JWTPayload**: `Partial`<`didJwt.JWTPayload`\>

the JWT payload

#### Defined in

[types.ts:142](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L142)

___

### KeyPair

Ƭ **KeyPair**: `Object`

key pair

#### Type declaration

| Name | Type |
| :------ | :------ |
| `publicKey` | `Uint8Array` |
| `secretKey` | `Uint8Array` |

#### Defined in

[types.ts:243](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L243)

___

### PresentationJWTPayload

Ƭ **PresentationJWTPayload**: `Object`

A JWT payload representation of a Presentation

**`See`**

https://www.w3.org/TR/vc-data-model/#jwt-encoding

#### Index signature

▪ [x: `string`]: `any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `aud` | `string` \| `string`[] |
| `exp?` | `number` |
| `iss?` | `string` |
| `jti?` | `string` |
| `nbf?` | `number` |
| `nonce?` | `string` |
| `vp` | [`VP`](internal_.md#vp) |

#### Defined in

[types.ts:165](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L165)

___

### Proof

Ƭ **Proof**: [`Extensible`](internal_.md#extensible)<{ `type?`: `string`  }\>

#### Defined in

[types.ts:56](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L56)

___

### Replace

Ƭ **Replace**<`T`, `U`\>: `Omit`<`T`, keyof `U`\> & `U`

Replaces the matching property types of T with the ones in U

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Defined in

[types.ts:35](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L35)

___

### VC

Ƭ **VC**<`T`\>: [`Extensible`](internal_.md#extensible)<{ `@context`: `string`[] \| `string` ; `credentialStatus?`: [`CredentialStatus`](../interfaces/internal_.CredentialStatus.md) ; `credentialSubject`: [`CredentialSubject`](internal_.md#credentialsubject) & `T` ; `evidence?`: `any` ; `termsOfUse?`: `any` ; `type`: `string`[] \| `string`  }\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:122](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L122)

___

### VP

Ƭ **VP**: [`Extensible`](internal_.md#extensible)<{ `@context`: `string`[] \| `string` ; `type`: `string`[] \| `string` ; `verifiableCredential?`: `string`[] \| `string`  }\>

#### Defined in

[types.ts:133](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L133)

___

### Verifiable

Ƭ **Verifiable**<`T`\>: `Readonly`<`T`\> & { `proof`: [`Proof`](internal_.md#proof)  }

Represents a readonly representation of a verifiable object, including the [Proof](internal_.md#proof)
property that can be used to verify it.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:64](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L64)

___

### VerifiableCredential

Ƭ **VerifiableCredential**<`T`\>: [`Verifiable`](internal_.md#verifiable)<[`W3CCredential`](internal_.md#w3ccredential)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `Record`<`string`, `any`\> |

#### Defined in

[types.ts:98](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L98)

___

### VerifiedCredentialJWT

Ƭ **VerifiedCredentialJWT**<`T`\>: [`VerifiedJWT`](internal_.md#verifiedjwt)<{ `vc`: [`VC`](internal_.md#vc)<`T`\>  }\> & { `verifiableCredential`: [`Verifiable`](internal_.md#verifiable)<[`W3CCredential`](internal_.md#w3ccredential)<`T`\>\>  }

Represents the result of a credential verification.
It includes the properties produced by `did-jwt` and a W3C compliant representation of
the Credential that was just verified.

This is usually the result of a verification method and not meant to be created by generic code.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:225](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L225)

___

### VerifiedJWT

Ƭ **VerifiedJWT**<`T`\>: [`Replace`](internal_.md#replace)<`didJwt.JWTVerified`, { `payload`: `didJwt.JWTPayload` & `T`  }\>

Result object returned by verifyJWT

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `Record`<`string`, `any`\> |

#### Defined in

[types.ts:213](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L213)

___

### VerifiedPresentationJWT

Ƭ **VerifiedPresentationJWT**: [`VerifiedJWT`](internal_.md#verifiedjwt)<{ `vp`: [`VP`](internal_.md#vp)  }\> & { `verifiablePresentation`: [`Verifiable`](internal_.md#verifiable)<[`W3CPresentation`](internal_.md#w3cpresentation)\>  }

Represents the result of a credential verification.
It includes the properties produced by `did-jwt` and a W3C compliant representation of
the Credential that was just verified.

This is usually the result of a verification method and not meant to be created by generic code.

#### Defined in

[types.ts:236](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L236)

___

### VerifyCredentialJWTOptions

Ƭ **VerifyCredentialJWTOptions**: `didJwtVc.VerifyCredentialOptions`

Represents the verification options that can be passed to the verifyCredentialJWT method.

#### Defined in

[types.ts:203](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L203)

___

### VerifyJWTOptions

Ƭ **VerifyJWTOptions**: `Partial`<`didJwt.JWTVerifyOptions`\>

Represents the verification options that can be passed to the verifyJWT method.

#### Defined in

[types.ts:198](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L198)

___

### VerifyPresentationJWTOptions

Ƭ **VerifyPresentationJWTOptions**: `didJwtVc.VerifyPresentationOptions`

Represents the verification options that can be passed to the verifyPresentationJWT method.

#### Defined in

[types.ts:208](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L208)

___

### W3CCredential

Ƭ **W3CCredential**<`T`\>: `Object`

This data type represents a parsed VerifiableCredential.
It is meant to be an unambiguous representation of the properties of a Credential and is usually the result of a
transformation method.

`issuer` is always an object with an `id` property and potentially other app specific issuer claims
`issuanceDate` is an ISO DateTime string
`expirationDate`, is a nullable ISO DateTime string

Any JWT specific properties are transformed to the broader W3C variant and any app specific properties are left
intact

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `Record`<`string`, `any`\> |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `@context` | `string`[] |
| `credentialStatus?` | [`CredentialStatus`](../interfaces/internal_.CredentialStatus.md) |
| `credentialSubject` | [`Extensible`](internal_.md#extensible)<{ `id?`: `string`  }\> & `T` |
| `evidence?` | `any` |
| `expirationDate?` | `string` |
| `id?` | `string` |
| `issuanceDate` | `string` |
| `issuer` | { `id`: `string`  } |
| `issuer.id` | `string` |
| `termsOfUse?` | `any` |
| `type` | `string`[] |

#### Defined in

[types.ts:78](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L78)

___

### W3CPresentation

Ƭ **W3CPresentation**: `Object`

This data type represents a parsed Presentation payload.
It is meant to be an unambiguous representation of the properties of a Presentation and is usually the result of a
transformation method.

The `verifiableCredential` array should contain parsed `Verifiable<Credential>` elements.
Any JWT specific properties are transformed to the broader W3C variant and any other app specific properties are
left intact.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `@context` | `string`[] |
| `expirationDate?` | `string` |
| `holder` | `string` |
| `id?` | `string` |
| `issuanceDate` | `string` |
| `type` | `string`[] |
| `verifiableCredential` | [`Verifiable`](internal_.md#verifiable)<[`W3CCredential`](internal_.md#w3ccredential)\>[] |
| `verifier` | `string`[] |

#### Defined in

[types.ts:111](https://github.com/higayasuo/did-jwt-toolkit/blob/0e3be2d/src/types.ts#L111)
