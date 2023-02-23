[did-jwt-toolkit](README.md) / Exports

# did-jwt-toolkit

## Table of contents

### Modules

- [&lt;internal\&gt;](modules/internal_.md)

### Type Aliases

- [CreateCredentialJWTOptions](modules.md#createcredentialjwtoptions)
- [CreateJWTOptions](modules.md#createjwtoptions)
- [CreatePresentationJWTOptions](modules.md#createpresentationjwtoptions)
- [CredentialJWTPayload](modules.md#credentialjwtpayload)
- [Issuer](modules.md#issuer)
- [JWTPayload](modules.md#jwtpayload)
- [PresentationJWTPayload](modules.md#presentationjwtpayload)
- [VerifiedCredentialJWT](modules.md#verifiedcredentialjwt)
- [VerifiedJWT](modules.md#verifiedjwt)
- [VerifiedPresentationJWT](modules.md#verifiedpresentationjwt)
- [VerifyCredentialJWTOptions](modules.md#verifycredentialjwtoptions)
- [VerifyJWTOptions](modules.md#verifyjwtoptions)
- [VerifyPresentationJWTOptions](modules.md#verifypresentationjwtoptions)

### Variables

- [DEFAULT\_CONTEXT](modules.md#default_context)
- [DEFAULT\_VC\_TYPE](modules.md#default_vc_type)
- [DEFAULT\_VP\_TYPE](modules.md#default_vp_type)
- [Resolver](modules.md#resolver)

### Functions

- [createCredentialJWT](modules.md#createcredentialjwt)
- [createJWT](modules.md#createjwt)
- [createPresentationJWT](modules.md#createpresentationjwt)
- [getDIDKeyDriver](modules.md#getdidkeydriver)
- [typedCredential](modules.md#typedcredential)
- [verifyCredentialJWT](modules.md#verifycredentialjwt)
- [verifyJWT](modules.md#verifyjwt)
- [verifyPresentationJWT](modules.md#verifypresentationjwt)

## Type Aliases

### CreateCredentialJWTOptions

Ƭ **CreateCredentialJWTOptions**: [`CreateCredentialJWTOptions`](modules/internal_.md#createcredentialjwtoptions)

Represents the creation options that can be passed to [createCredentialJWT](modules.md#createcredentialjwt)

#### Defined in

[index.ts:75](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L75)

___

### CreateJWTOptions

Ƭ **CreateJWTOptions**: [`CreateJWTOptions`](modules/internal_.md#createjwtoptions)

the options for [createJWT](modules.md#createjwt)

#### Defined in

[index.ts:70](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L70)

___

### CreatePresentationJWTOptions

Ƭ **CreatePresentationJWTOptions**: [`CreatePresentationJWTOptions`](modules/internal_.md#createpresentationjwtoptions)

Represents the creation options that can be passed to [createPresentationJWT](modules.md#createpresentationjwt)

#### Defined in

[index.ts:80](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L80)

___

### CredentialJWTPayload

Ƭ **CredentialJWTPayload**<`T`\>: [`CredentialJWTPayload`](modules/internal_.md#credentialjwtpayload)<`T`\>

A JWT payload representation of a Credential

**`See`**

https://www.w3.org/TR/vc-data-model/#jwt-encoding

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `Record`<`string`, `any`\> |

#### Defined in

[index.ts:43](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L43)

___

### Issuer

Ƭ **Issuer**: [`Issuer`](modules/internal_.md#issuer)

the issuer

#### Defined in

[index.ts:27](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L27)

___

### JWTPayload

Ƭ **JWTPayload**: [`JWTPayload`](modules/internal_.md#jwtpayload)

the JWT payload

#### Defined in

[index.ts:37](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L37)

___

### PresentationJWTPayload

Ƭ **PresentationJWTPayload**: [`PresentationJWTPayload`](modules/internal_.md#presentationjwtpayload)

A JWT payload representation of a Presentation

**`See`**

https://www.w3.org/TR/vc-data-model/#jwt-encoding

#### Defined in

[index.ts:50](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L50)

___

### VerifiedCredentialJWT

Ƭ **VerifiedCredentialJWT**<`T`\>: [`VerifiedCredentialJWT`](modules/internal_.md#verifiedcredentialjwt)<`T`\>

Represents the result of a credential JWT verification

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[index.ts:60](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L60)

___

### VerifiedJWT

Ƭ **VerifiedJWT**<`T`\>: [`VerifiedJWT`](modules/internal_.md#verifiedjwt)<`T`\>

Represents the result of a JWT verification

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[index.ts:55](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L55)

___

### VerifiedPresentationJWT

Ƭ **VerifiedPresentationJWT**: [`VerifiedPresentationJWT`](modules/internal_.md#verifiedpresentationjwt)

Represents the result of a presentation JWT verification

#### Defined in

[index.ts:65](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L65)

___

### VerifyCredentialJWTOptions

Ƭ **VerifyCredentialJWTOptions**: [`VerifyCredentialJWTOptions`](modules/internal_.md#verifycredentialjwtoptions)

Represents the verification options that can be passed to [verifyCredentialJWT](modules.md#verifycredentialjwt)

#### Defined in

[index.ts:90](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L90)

___

### VerifyJWTOptions

Ƭ **VerifyJWTOptions**: [`VerifyJWTOptions`](modules/internal_.md#verifyjwtoptions)

Represents the verification options that can be passed to [verifyJWT](modules.md#verifyjwt)

#### Defined in

[index.ts:85](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L85)

___

### VerifyPresentationJWTOptions

Ƭ **VerifyPresentationJWTOptions**: [`VerifyPresentationJWTOptions`](modules/internal_.md#verifypresentationjwtoptions)

Represents the verification options that can be passed to [verifyPresentationJWT](modules.md#verifypresentationjwt)

#### Defined in

[index.ts:95](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L95)

## Variables

### DEFAULT\_CONTEXT

• `Const` **DEFAULT\_CONTEXT**: ``"https://www.w3.org/2018/credentials/v1"``

https://www.w3.org/2018/credentials/v1

#### Defined in

[index.ts:12](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L12)

___

### DEFAULT\_VC\_TYPE

• `Const` **DEFAULT\_VC\_TYPE**: ``"VerifiableCredential"``

VerifiableCredential

#### Defined in

[index.ts:17](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L17)

___

### DEFAULT\_VP\_TYPE

• `Const` **DEFAULT\_VP\_TYPE**: ``"VerifiablePresentation"``

VerifiablePresentation

#### Defined in

[index.ts:22](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L22)

___

### Resolver

• `Const` **Resolver**: typeof `Resolver` = `didResolver.Resolver`

the resolver for DID

#### Defined in

[index.ts:32](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L32)

## Functions

### createCredentialJWT

▸ **createCredentialJWT**(`payload`, `issuer`, `options?`): `Promise`<`string`\>

Creates a signed credential JWT

**`Example`**

```typescript
 import * from didJwtKit from 'did-jwt-toolkit';

 const driver = didJwtKit.getDIDKeyDriver('EdDSA');

 const issuerKeyPair = driver.generateKeyPair();
 const holderKeyPair = driver.generateKeyPair();

 const issuer = driver.issuerFromKeyPair(issuerKeyPair);
 const holderDID = driver.didFromPublicKey(holderKeyPair.publicKey);

 type MyPayload = {
   name: string;
 };

 const payload: didJwtKit.CredentialJWTPayload<MyPayload> = {
   sub: holderDID,
   vc: {
     '@context': [didJwtKit.DEFAULT_CONTEXT],
     type: [didJwtKit.DEFAULT_VC_TYPE],
     credentialSubject: {
       name: 'aaa',
     },
   },
 };

 const vcJWT = await didJwtKit.createCredentialJWT(payload, issuer);
 ```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [`CredentialJWTPayload`](modules.md#credentialjwtpayload)<`Record`<`string`, `any`\>\> | the credential JWT payload |
| `issuer` | `Issuer` | the issuer |
| `options` | `CreateCredentialOptions` | the options |

#### Returns

`Promise`<`string`\>

a signed credential JWT

#### Defined in

[index.ts:204](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L204)

___

### createJWT

▸ **createJWT**(`payload`, `issuer`, `options?`): `Promise`<`string`\>

Creates a signed JWT

**`Example`**

```typescript
 import * didJwtKit from 'did-jwt-toolkit';

 const driver = didJwtKit.getDIDKeyDriver('EdDSA');

 const issuerKeyPair = driver.generateKeyPair();
 const audienceKeyPair = driver.generateKeyPair();

 const issuer = driver.issuerFromKeyPair(issuerKeyPair);
 const audienceDID = driver.didFromPublicKey(audienceKeyPair.publicKey);

 type MyPayload = {
   name: string;
 };

 const payload: didJwtKit.JWTPayload & MyPayload = {
   aud: audienceDID,
   name: 'My name',
 };

 const jwt = await didJwtKit.createJWT(payload, issuer);
 ```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Partial`<`JWTPayload`\> | the JWT payload |
| `issuer` | `Issuer` | the issuer |
| `options` | [`CreateJWTOptions`](modules/internal_.md#createjwtoptions) | the JWT options |

#### Returns

`Promise`<`string`\>

a signed JWT

#### Defined in

[index.ts:148](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L148)

___

### createPresentationJWT

▸ **createPresentationJWT**(`payload`, `holder`, `options?`): `Promise`<`string`\>

Creates a signed presentation JWT

**`Example`**

```typescript
 import * as didJwtKit from 'did-jwt-toolkit';

 const driver = didJwtKit.getDIDKeyDriver('EdDSA');

 const issuerKeyPair = driver.generateKeyPair();
 const holderKeyPair = driver.generateKeyPair();
 const verifierKeyPair = driver.generateKeyPair();

 const issuer = driver.issuerFromKeyPair(issuerKeyPair);
 const holder = driver.issuerFromKeyPair(holderKeyPair);
 const verifierDID = driver.didFromPublicKey(holderKeyPair.publicKey);

 type MyPayload = {
   name: string;
 };

 const vcPayload: didJwtKit.CredentialJWTPayload<MyPayload> = {
   sub: holder.did,
   vc: {
     '@context': [didJwtKit.DEFAULT_CONTEXT],
     type: [didJwtKit.DEFAULT_VC_TYPE],
     credentialSubject: {
       name: 'aaa',
     },
   },
 };

 const vcJWT = await didJwtKit.createPresentationJWT(vpPayload, issuer);

 const vpPayload: didJwtKit.PresentationJWTPayload = {
   aud: verifierDID,
   vp: {
     '@context': [didJwtKit.DEFAULT_CONTEXT],
     type: [didJwtKit.DEFAULT_VP_TYPE],
     verifiableCredential: [vcJWT],
   },
 };

 const vpJWT = await didJwtKit.createPresentationJWT(vpPayload, holder);
 ```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [`PresentationJWTPayload`](modules/internal_.md#presentationjwtpayload) | the presentation JWT payload |
| `holder` | `Issuer` | the holder |
| `options` | `CreatePresentationOptions` | the options |

#### Returns

`Promise`<`string`\>

a signed presentation JWT

#### Defined in

[index.ts:263](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L263)

___

### getDIDKeyDriver

▸ **getDIDKeyDriver**(`algName`): [`DIDKeyDriver`](classes/internal_.DIDKeyDriver.md)

Returns the did:key driver

**`Example`**

```typescript
import * as didJwtKit from 'did-jwt-toolkit';

const driver = didJwtDriver.getDIDKeyDriver('EdDSA');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `algName` | [`AlgName`](modules/internal_.md#algname) | "EdDSA", "ES256K" or "ES256" |

#### Returns

[`DIDKeyDriver`](classes/internal_.DIDKeyDriver.md)

the did:key driver

#### Defined in

[index.ts:110](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L110)

___

### typedCredential

▸ **typedCredential**<`T`\>(`credential`): [`VerifiableCredential`](modules/internal_.md#verifiablecredential)<`T`\>

Converts the untyped verifiable credential to a typed verifiable credential

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `credential` | [`VerifiableCredential`](modules/internal_.md#verifiablecredential)<`Record`<`string`, `any`\>\> | the untyped verifiable credential |

#### Returns

[`VerifiableCredential`](modules/internal_.md#verifiablecredential)<`T`\>

a typed verifiable credential

#### Defined in

[index.ts:457](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L457)

___

### verifyCredentialJWT

▸ **verifyCredentialJWT**<`T`\>(`vcJWT`, `resolver`, `options?`): `Promise`<[`VerifiedCredentialJWT`](modules.md#verifiedcredentialjwt)<`T`\>\>

Verifies a credential JWT

**`Example`**

```typescript
 import * as didJwtKit from 'did-jwt-toolkit';

 const driver = didJwtKit.getDIDKeyDriver('EdDSA');

 const issuerKeyPair = driver.generateKeyPair();
 const holderKeyPair = driver.generateKeyPair();

 const issuer = driver.issuerFromKeyPair(issuerKeyPair);
 const holderDID = driver.didFromPublicKey(holderKeyPair.publicKey);

 type MyPayload = {
   name: string;
 };

 const payload: didJwtKit.CredentialJWTPayload<MyPayload> = {
   sub: holderDID,
   vc: {
     '@context': [didJwtKit.DEFAULT_CONTEXT],
     type: [didJwtKit.DEFAULT_VC_TYPE],
     credentialSubject: {
       name: 'aaa',
     },
   },
 };

 const vcJWT = await didJwtKit.createCredentialJWT(payload, issuer);

 const resolver = new didJwtKit.Resolver(driver.getResolverRegistry());

 const verifiedVC = await didJwtKit.verifyCredentialJWT<MyPayload>(vcJWT, resolver);

 // Type-safe access to the name property
 console.log(verifiedVC.verifiableCredential.credentialSubject.name);
 ```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vcJWT` | `string` | - |
| `resolver` | `Resolvable` | the resolver for DID |
| `options` | `VerifyCredentialOptions` | the options for verifyCredentialJWT |

#### Returns

`Promise`<[`VerifiedCredentialJWT`](modules.md#verifiedcredentialjwt)<`T`\>\>

a promise of a verified credential JWT

#### Defined in

[index.ts:372](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L372)

___

### verifyJWT

▸ **verifyJWT**<`T`\>(`jwt`, `resolver`, `options?`): `Promise`<[`VerifiedJWT`](modules.md#verifiedjwt)<`T`\>\>

Verifies given JWT

**`Example`**

```typescript
 import * as didJwtKit from 'did-jwt-toolkit';

 const driver = didJwtKit.getDIDKeyDriver('EdDSA');

 const issuerKeyPair = driver.generateKeyPair();
 const audienceKeyPair = driver.generateKeyPair();

 const issuer = driver.issuerFromKeyPair(issuerKeyPair);
 const audienceDID = driver.didFromPublicKey(audienceKeyPair.publicKey);

 type MyPayload = {
   name: string;
 };

 const payload: didJwtKit.JWTPayload & MyPayload = {
   aud: audienceDID,
   name: 'My name',
 };

 const jwt = await didJwtKit.createJWT(payload, issuer);

 const resolver = new didJwtKit.Resolver(driver.getResolverRegistry());

 const verifiedJWT = await didJwtKit.verifyJWT<MyPayload>(jwt, resolver,
   { audience: audienceDID });

 // Type-safe access to the name property
 console.log(verifiedJWT.payload.name);
 ```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jwt` | `string` | the JWT to verify |
| `resolver` | `Resolvable` | the resolver for DID |
| `options` | `Partial`<`JWTVerifyOptions`\> | the options for verifyJWT |

#### Returns

`Promise`<[`VerifiedJWT`](modules.md#verifiedjwt)<`T`\>\>

a promise of a verified JWT

#### Defined in

[index.ts:312](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L312)

___

### verifyPresentationJWT

▸ **verifyPresentationJWT**(`vpJWT`, `resolver`, `options?`): `Promise`<[`VerifiedPresentationJWT`](modules/internal_.md#verifiedpresentationjwt)\>

Verifies a presentation JWT

**`Example`**

```typescript
 import * as didJwtKit from 'did-jwt-toolkit';

 const driver = didJwtKit.getDIDKeyDriver('EdDSA');

 const issuerKeyPair = driver.generateKeyPair();
 const holderKeyPair = driver.generateKeyPair();
 const verifierKeyPair = driver.generateKeyPair();

 const issuer = driver.issuerFromKeyPair(issuerKeyPair);
 const holder = driver.issuerFromKeyPair(holderKeyPair);
 const verifierDID = driver.didFromPublicKey(holderKeyPair.publicKey);

 type MyPayload = {
   name: string;
 };

 const vcPayload: didJwtKit.CredentialJWTPayload<MyPayload> = {
   sub: holder.did,
   vc: {
     '@context': [didJwtKit.DEFAULT_CONTEXT],
     type: [didJwtKit.DEFAULT_VC_TYPE],
     credentialSubject: {
       name: 'aaa',
     },
   },
 };

 const vcJWT = didJwtKit.await createPresentationJWT(vpPayload, issuer);

 const vpPayload: didJwtKit.PresentationJWTPayload = {
   aud: verifierDID,
   vp: {
     '@context': [didJwtKit.DEFAULT_CONTEXT],
     type: [didJwtKit.DEFAULT_VP_TYPE],
     verifiableCredential: [vcJWT],
   },
 };

 const vpJWT = await didJwtKit.didJwtKit.createPresentationJWT(vpPayload, holder);

 const resolver = new didJwtKit.Resolver(driver.getResolverRegistry());

 const verifiedVP = await didJwtKit.verifyCredentialJWT(vpJWT, resolver,
   { audience: verifierDID });
 ```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vpJWT` | `string` | the presentation JWT to verify |
| `resolver` | `Resolvable` | the resolver for DID |
| `options` | `VerifyPresentationOptions` | the options for verifyJWT |

#### Returns

`Promise`<[`VerifiedPresentationJWT`](modules/internal_.md#verifiedpresentationjwt)\>

a promise of the verified presentation JWT

#### Defined in

[index.ts:439](https://github.com/higayasuo/did-jwt-toolkit/blob/546d701/src/index.ts#L439)
