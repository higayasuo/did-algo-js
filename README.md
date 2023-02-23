# did-jwt-toolkit

This toolkit simplifies development with did-jwt and did-jwt-vc.

## JSDocs

[JSDocs](https://github.com/higayasuo/did-jwt-toolkit/blob/main/docs/modules.md)

## Installation

```sh
npm install git+https://github.com/higayasuo/did-jwt-toolkit
```

## unnstallation

```sh
npm uninstall did-jwt-toolkit
```

## Usage

### Creating JWTs

#### Getting DIDKeyDriver

Get a did:key driver. EdDSA, ES256K and ES256 algorithms are supported.

```typescript
import * as didJwtKit from 'did-jwt-toolkit';

const driver = didJwtKit.getDIDKeyDriver('EdDSA');
//driver = didJwtKit.getDIDKeyDriver('ES256K');
//driver = didJwtKit.getDIDKeyDriver('ES256');
```

#### Creating KeyPairs

Create `KeyPair` objects.　 A `KeyPair` consists of a public key and a private key.

```typescript
const issuerKeyPair = driver.generateKeyPair();
const audienceKeyPair = driver.generateKeyPair();
```

#### Creating an Issuer of the issuer

Create an `Issuer` object of the issuer.
An `Issuer` consists of a did property, a signer property and an alg property.
A did property and an alg property are used in the JWT header.
A signer generates the signature of JWT.

```typescript
const issuer = driver.issuerFromKeyPair(issuerKeyPair);
```

#### Creating a DID of the audience

Create a `DID` of the audience.
A audience does not need a signer and an alg.

```typescript
const audienceDID = driver.didFromPublicKey(audienceKeyPair.publicKey);
```

#### Creating a JWT

Specify a `payload` and create a JWT with `issuer` using the `createJWT` function.
You need to specify the audience’s DID in the aud property of the JWT header.

```typescript
type MyPayload = {
  name: string;
};

const payload: didJwtKit.JWTPayload & MyPayload = {
  aud: audienceDID,
  name: 'My name',
};

const jwt = await didJwtKit.createJWT(payload, issuer);
console.log(jwt);
// eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...yRiCb8zLByiB9YXfa2T97IO6WCE3inQQCQ
```

#### Creating a credential JWT

Specify a `payload` and create a credential JWT with `issuer` using the `createCredentialJWT` function.
You have to set a holder DID to an sub property of JWT header.

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
console.log(vcJWT);
// eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...yRiCb8zLByiB9YXfa2T97IO6WCE3inQQCQ
```

#### Creating a presentation JWT

Specify a `payload` and create a credential JWT with `issuer` using the `createCredentialJWT` function.

You need to assign a holder DID to a sub property in the credential JWT header and a verifier DID to an aud property in the presentation JWT header.

The issuer of a credential JWT is an issuer.
The issuer of a presentation JWT is a holder.

```typescript
import * as didJwtKit from 'did-jwt-toolkit';

const driver = didJwtKit.getDIDKeyDriver('EdDSA');

const issuerKeyPair = driver.generateKeyPair();
const holderKeyPair = driver.generateKeyPair();
const verifierKeyPair = driver.generateKeyPair();

const issuer = driver.issuerFromKeyPair(issuerKeyPair);
const holder = driver.issuerFromKeyPair(holderKeyPair);
const verifierDID = driver.didFromPublicKey(verifierKeyPair.publicKey);

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

const vcJWT = await didJwtKit.createCredentialJWT(vcPayload, issuer);

const vpPayload: didJwtKit.PresentationJWTPayload = {
  aud: verifierDID,
  vp: {
    '@context': [didJwtKit.DEFAULT_CONTEXT],
    type: [didJwtKit.DEFAULT_VP_TYPE],
    verifiableCredential: [vcJWT],
  },
};

const vpJWT = await didJwtKit.createPresentationJWT(vpPayload, holder);
console.log(vcJWT);
// eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...yRiCb8zLByiB9YXfa2T97IO6WCE3inQQCQ
```

### Verifying JWTs

#### Resolver

Create a `Resolver`.
it is necessary to resolve its DID Document to check for keys that can validate the signature.

```typescript
const resolver = new didJwtKit.Resolver(driver.getResolverRegistry());
```

#### Verifying a JWT

Pass in a JWT along with the resolver to verify using the `verifyJWT` function.

If you use the JWT header aud property, you must use the same value for both the JWT header’s aud property and the VerifyJWTOptions’ audience property to ensure that your token is intended for a specific recipient.

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

const verifiedJWT = await didJwtKit.verifyJWT<MyPayload>(jwt, resolver, {
  audience: audienceDID,
});

// Type-safe access to the name property
console.log(verifiedJWT.payload.name);

console.log(JSON.stringify(verifiedJWT, undefined, 2));
/*
{
  "verified": true,
  "payload": {
    "iat": 1677049413,
    "aud": "did:key:z6MkjBheABPqdi3d8HFevRytHP7n2F3ZWPtFZgRhnptuXKns",
    "name": "My name",
    "iss": "did:key:z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN"
  },
  "didResolutionResult": {
    "didResolutionMetadata": {
      "contentType": "application/did+ld+json"
    },
    "didDocumentMetadata": {},
    "didDocument": {
      "@context": [
        "https://www.w3.org/ns/did/v1",
        "https://w3id.org/security/suites/jws-2020/v1"
      ],
      "id": "did:key:z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN",
      "verificationMethod": [
        {
          "id": "did:key:z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN#z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN",
          "type": "JsonWebKey2020",
          "controller": "did:key:z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN",
          "publicKeyJwk": {
            "kty": "OKP",
            "crv": "Ed25519",
            "x": "xG_RGpn69SBcT5asA2-nZcsR0r7PIsJ5RNsKt6YHQgc"
          }
        }
      ],
      "authentication": [
        "did:key:z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN#z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN"
      ],
      "assertionMethod": [
        "did:key:z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN#z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN"
      ],
      "capabilityDelegation": [
        "did:key:z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN#z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN"
      ],
      "capabilityInvocation": [
        "did:key:z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN#z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN"
      ]
    }
  },
  "issuer": "did:key:z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN",
  "signer": {
    "id": "did:key:z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN#z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN",
    "type": "JsonWebKey2020",
    "controller": "did:key:z6Mksg4qzqd5CoQoSZcgJeBbPaXiLZkNsdXguYr9nWaEAyaN",
    "publicKeyJwk": {
      "kty": "OKP",
      "crv": "Ed25519",
      "x": "xG_RGpn69SBcT5asA2-nZcsR0r7PIsJ5RNsKt6YHQgc"
    }
  },
  "jwt": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzcwNDk0MTMsImF1ZCI6ImRpZDprZXk6ejZNa2pCaGVBQlBxZGkzZDhIRmV2Unl0SFA3bjJGM1pXUHRGWmdSaG5wdHVYS25zIiwibmFtZSI6Ik15IG5hbWUiLCJpc3MiOiJkaWQ6a2V5Ono2TWtzZzRxenFkNUNvUW9TWmNnSmVCYlBhWGlMWmtOc2RYZ3VZcjluV2FFQXlhTiJ9.Eqdrmahb968VvP3Fvlj3aisGichbkyHOSc5O4milniI_-fO_QpMDU945JQnd9AGtJyTmqvsRZj4-0Y0AZSW9Cg",
  "policies": {}
}
*/
```

#### Verifying a credential JWT

Pass in a credential JWT along with the resolver to verify using the `verifyCredentialJWT` function:

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

const verifiedVC = await didJwtKit.verifyCredentialJWT<MyPayload>(
  vcJWT,
  resolver
);

// Type-safe access to the name property
console.log(verifiedVC.verifiableCredential.credentialSubject.name);

console.log(JSON.stringify(verifiedVC, undefined, 2));
/*
{
  "verified": true,
  "payload": {
    "vc": {
      "@context": [
        "https://www.w3.org/2018/credentials/v1"
      ],
      "type": [
        "VerifiableCredential"
      ],
      "credentialSubject": {
        "name": "aaa"
      }
    },
    "sub": "did:key:z6Mkj6z9TMUw8Zk8sCUZgZe93Rc6w7szUWYRnDovmGSTiPu7",
    "iss": "did:key:z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN"
  },
  "didResolutionResult": {
    "didResolutionMetadata": {
      "contentType": "application/did+ld+json"
    },
    "didDocumentMetadata": {},
    "didDocument": {
      "@context": [
        "https://www.w3.org/ns/did/v1",
        "https://w3id.org/security/suites/jws-2020/v1"
      ],
      "id": "did:key:z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN",
      "verificationMethod": [
        {
          "id": "did:key:z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN#z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN",
          "type": "JsonWebKey2020",
          "controller": "did:key:z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN",
          "publicKeyJwk": {
            "kty": "OKP",
            "crv": "Ed25519",
            "x": "-_lFq3KBfmkDp3w88amPh6eDUiE1VLlUD-WaI_XYyzk"
          }
        }
      ],
      "authentication": [
        "did:key:z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN#z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN"
      ],
      "assertionMethod": [
        "did:key:z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN#z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN"
      ],
      "capabilityDelegation": [
        "did:key:z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN#z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN"
      ],
      "capabilityInvocation": [
        "did:key:z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN#z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN"
      ]
    }
  },
  "issuer": "did:key:z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN",
  "signer": {
    "id": "did:key:z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN#z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN",
    "type": "JsonWebKey2020",
    "controller": "did:key:z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN",
    "publicKeyJwk": {
      "kty": "OKP",
      "crv": "Ed25519",
      "x": "-_lFq3KBfmkDp3w88amPh6eDUiE1VLlUD-WaI_XYyzk"
    }
  },
  "jwt": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7Im5hbWUiOiJhYWEifX0sInN1YiI6ImRpZDprZXk6ejZNa2o2ejlUTVV3OFprOHNDVVpnWmU5M1JjNnc3c3pVV1lSbkRvdm1HU1RpUHU3IiwiaXNzIjoiZGlkOmtleTp6Nk1rd1FycVBtMXNXTEZpR3p4RG5mOEdwYWFhZ0g2SFFWZVNDZzQzZkZXczZNWE4ifQ.BrGIIYSTSTyW71Qal5_tq8CLDMH66uQjl1_WzBVJj6fGLHsSYBki12ttootNh8ABMLEjyFqYF1NPawFRjmbLAQ",
  "policies": {},
  "verifiableCredential": {
    "credentialSubject": {
      "name": "aaa",
      "id": "did:key:z6Mkj6z9TMUw8Zk8sCUZgZe93Rc6w7szUWYRnDovmGSTiPu7"
    },
    "issuer": {
      "id": "did:key:z6MkwQrqPm1sWLFiGzxDnf8GpaaagH6HQVeSCg43fFWs6MXN"
    },
    "type": [
      "VerifiableCredential"
    ],
    "@context": [
      "https://www.w3.org/2018/credentials/v1"
    ],
    "proof": {
      "type": "JwtProof2020",
      "jwt": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7Im5hbWUiOiJhYWEifX0sInN1YiI6ImRpZDprZXk6ejZNa2o2ejlUTVV3OFprOHNDVVpnWmU5M1JjNnc3c3pVV1lSbkRvdm1HU1RpUHU3IiwiaXNzIjoiZGlkOmtleTp6Nk1rd1FycVBtMXNXTEZpR3p4RG5mOEdwYWFhZ0g2SFFWZVNDZzQzZkZXczZNWE4ifQ.BrGIIYSTSTyW71Qal5_tq8CLDMH66uQjl1_WzBVJj6fGLHsSYBki12ttootNh8ABMLEjyFqYF1NPawFRjmbLAQ"
    }
  }
}
*/
```

#### Verifying a presentation JWT

Pass in a presentation JWT along with the resolver to verify using the `verifyPresentationJWT` function.

If you use the JWT header aud property, you must use the same value for both the JWT header’s aud property and the VerifyJWTOptions’ audience property to ensure that your token is intended for a specific recipient.

```typescript
import * as didJwtKit from 'did-jwt-toolkit';

const driver = didJwtKit.getDIDKeyDriver('EdDSA');

const issuerKeyPair = driver.generateKeyPair();
const holderKeyPair = driver.generateKeyPair();
const verifierKeyPair = driver.generateKeyPair();

const issuer = driver.issuerFromKeyPair(issuerKeyPair);
const holder = driver.issuerFromKeyPair(holderKeyPair);
const verifierDID = driver.didFromPublicKey(verifierKeyPair.publicKey);

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

const vcJWT = await didJwtKit.createCredentialJWT(vcPayload, issuer);

const vpPayload: didJwtKit.PresentationJWTPayload = {
  aud: verifierDID,
  vp: {
    '@context': [didJwtKit.DEFAULT_CONTEXT],
    type: [didJwtKit.DEFAULT_VP_TYPE],
    verifiableCredential: [vcJWT],
  },
};

const vpJWT = await didJwtKit.createPresentationJWT(vpPayload, holder);

const resolver = new didJwtKit.Resolver(driver.getResolverRegistry());

const verifiedVP = await didJwtKit.verifyPresentationJWT(vpJWT, resolver, {
  audience: verifierDID,
});

const vc = didJwtKit.typedCredential<MyPayload>(
  verifiedVP.verifiablePresentation.verifiableCredential[0]
);

// Type-safe access to the name property
console.log(vc.credentialSubject.name);

console.log(JSON.stringify(verifiedVP, undefined, 2));
/*
{
  "verified": true,
  "payload": {
    "vp": {
      "@context": [
        "https://www.w3.org/2018/credentials/v1"
      ],
      "type": [
        "VerifiablePresentation"
      ],
      "verifiableCredential": [
        "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7Im5hbWUiOiJhYWEifX0sInN1YiI6ImRpZDprZXk6ejZNa2gzNGZzNG9RYXN3YXpWQ3BkODg0Q2VwZjJ4RUpqeXFvWVlEU2g0WVU3WWRmIiwiaXNzIjoiZGlkOmtleTp6Nk1rZnhMWVMxOHNma1YzY256Q1NBQXRjR1ZHUGllVG9meUU2bWJDcktUQUM0SG8ifQ.mvSF-Jq5bFMR-VPDGzgk_BqK6bJm1Kg3lT94XEk9iPuFRlwFSK9Kf0HUfocEufjNTOvlk5_cbt-QoAjkBMS7DA"
      ]
    },
    "aud": "did:key:z6MkrzGKn3fzKMgr9y9g5WGQNJiYZ7T2MgW7wLSjVNFUjdXG",
    "iss": "did:key:z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf"
  },
  "didResolutionResult": {
    "didResolutionMetadata": {
      "contentType": "application/did+ld+json"
    },
    "didDocumentMetadata": {},
    "didDocument": {
      "@context": [
        "https://www.w3.org/ns/did/v1",
        "https://w3id.org/security/suites/jws-2020/v1"
      ],
      "id": "did:key:z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf",
      "verificationMethod": [
        {
          "id": "did:key:z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf#z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf",
          "type": "JsonWebKey2020",
          "controller": "did:key:z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf",
          "publicKeyJwk": {
            "kty": "OKP",
            "crv": "Ed25519",
            "x": "JmBCkroj5YK_Bh5HZCCHn4D1R0S7Y48w1b7bb9PRV2o"
          }
        }
      ],
      "authentication": [
        "did:key:z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf#z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf"
      ],
      "assertionMethod": [
        "did:key:z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf#z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf"
      ],
      "capabilityDelegation": [
        "did:key:z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf#z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf"
      ],
      "capabilityInvocation": [
        "did:key:z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf#z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf"
      ]
    }
  },
  "issuer": "did:key:z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf",
  "signer": {
    "id": "did:key:z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf#z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf",
    "type": "JsonWebKey2020",
    "controller": "did:key:z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf",
    "publicKeyJwk": {
      "kty": "OKP",
      "crv": "Ed25519",
      "x": "JmBCkroj5YK_Bh5HZCCHn4D1R0S7Y48w1b7bb9PRV2o"
    }
  },
  "jwt": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGWkVSVFFTSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjJZeUk2ZXlKQVkyOXVkR1Y0ZENJNld5Sm9kSFJ3Y3pvdkwzZDNkeTUzTXk1dmNtY3ZNakF4T0M5amNtVmtaVzUwYVdGc2N5OTJNU0pkTENKMGVYQmxJanBiSWxabGNtbG1hV0ZpYkdWRGNtVmtaVzUwYVdGc0lsMHNJbU55WldSbGJuUnBZV3hUZFdKcVpXTjBJanA3SW01aGJXVWlPaUpoWVdFaWZYMHNJbk4xWWlJNkltUnBaRHByWlhrNmVqWk5hMmd6Tkdaek5HOVJZWE4zWVhwV1EzQmtPRGcwUTJWd1pqSjRSVXBxZVhGdldWbEVVMmcwV1ZVM1dXUm1JaXdpYVhOeklqb2laR2xrT210bGVUcDZOazFyWm5oTVdWTXhPSE5tYTFZelkyNTZRMU5CUVhSalIxWkhVR2xsVkc5bWVVVTJiV0pEY2t0VVFVTTBTRzhpZlEubXZTRi1KcTViRk1SLVZQREd6Z2tfQnFLNmJKbTFLZzNsVDk0WEVrOWlQdUZSbHdGU0s5S2YwSFVmb2NFdWZqTlRPdmxrNV9jYnQtUW9BamtCTVM3REEiXX0sImF1ZCI6ImRpZDprZXk6ejZNa3J6R0tuM2Z6S01ncjl5OWc1V0dRTkppWVo3VDJNZ1c3d0xTalZORlVqZFhHIiwiaXNzIjoiZGlkOmtleTp6Nk1raDM0ZnM0b1Fhc3dhelZDcGQ4ODRDZXBmMnhFSmp5cW9ZWURTaDRZVTdZZGYifQ.a0e6Ex-qEk32wzSXJahcAybHOqq625ZKMpepIajQK0MHuxtdrFOjnJVYhaR6DE4xm1TPrdTfSwoCYZjMt_V0AQ",
  "policies": {},
  "verifiablePresentation": {
    "verifiableCredential": [
      {
        "credentialSubject": {
          "name": "aaa",
          "id": "did:key:z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf"
        },
        "issuer": {
          "id": "did:key:z6MkfxLYS18sfkV3cnzCSAAtcGVGPieTofyE6mbCrKTAC4Ho"
        },
        "type": [
          "VerifiableCredential"
        ],
        "@context": [
          "https://www.w3.org/2018/credentials/v1"
        ],
        "proof": {
          "type": "JwtProof2020",
          "jwt": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7Im5hbWUiOiJhYWEifX0sInN1YiI6ImRpZDprZXk6ejZNa2gzNGZzNG9RYXN3YXpWQ3BkODg0Q2VwZjJ4RUpqeXFvWVlEU2g0WVU3WWRmIiwiaXNzIjoiZGlkOmtleTp6Nk1rZnhMWVMxOHNma1YzY256Q1NBQXRjR1ZHUGllVG9meUU2bWJDcktUQUM0SG8ifQ.mvSF-Jq5bFMR-VPDGzgk_BqK6bJm1Kg3lT94XEk9iPuFRlwFSK9Kf0HUfocEufjNTOvlk5_cbt-QoAjkBMS7DA"
        }
      }
    ],
    "holder": "did:key:z6Mkh34fs4oQaswazVCpd884Cepf2xEJjyqoYYDSh4YU7Ydf",
    "verifier": [
      "did:key:z6MkrzGKn3fzKMgr9y9g5WGQNJiYZ7T2MgW7wLSjVNFUjdXG"
    ],
    "type": [
      "VerifiablePresentation"
    ],
    "@context": [
      "https://www.w3.org/2018/credentials/v1"
    ],
    "proof": {
      "type": "JwtProof2020",
      "jwt": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGWkVSVFFTSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjJZeUk2ZXlKQVkyOXVkR1Y0ZENJNld5Sm9kSFJ3Y3pvdkwzZDNkeTUzTXk1dmNtY3ZNakF4T0M5amNtVmtaVzUwYVdGc2N5OTJNU0pkTENKMGVYQmxJanBiSWxabGNtbG1hV0ZpYkdWRGNtVmtaVzUwYVdGc0lsMHNJbU55WldSbGJuUnBZV3hUZFdKcVpXTjBJanA3SW01aGJXVWlPaUpoWVdFaWZYMHNJbk4xWWlJNkltUnBaRHByWlhrNmVqWk5hMmd6Tkdaek5HOVJZWE4zWVhwV1EzQmtPRGcwUTJWd1pqSjRSVXBxZVhGdldWbEVVMmcwV1ZVM1dXUm1JaXdpYVhOeklqb2laR2xrT210bGVUcDZOazFyWm5oTVdWTXhPSE5tYTFZelkyNTZRMU5CUVhSalIxWkhVR2xsVkc5bWVVVTJiV0pEY2t0VVFVTTBTRzhpZlEubXZTRi1KcTViRk1SLVZQREd6Z2tfQnFLNmJKbTFLZzNsVDk0WEVrOWlQdUZSbHdGU0s5S2YwSFVmb2NFdWZqTlRPdmxrNV9jYnQtUW9BamtCTVM3REEiXX0sImF1ZCI6ImRpZDprZXk6ejZNa3J6R0tuM2Z6S01ncjl5OWc1V0dRTkppWVo3VDJNZ1c3d0xTalZORlVqZFhHIiwiaXNzIjoiZGlkOmtleTp6Nk1raDM0ZnM0b1Fhc3dhelZDcGQ4ODRDZXBmMnhFSmp5cW9ZWURTaDRZVTdZZGYifQ.a0e6Ex-qEk32wzSXJahcAybHOqq625ZKMpepIajQK0MHuxtdrFOjnJVYhaR6DE4xm1TPrdTfSwoCYZjMt_V0AQ"
    }
  }
}
*/
```
