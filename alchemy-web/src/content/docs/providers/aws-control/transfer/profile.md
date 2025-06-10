---
title: Profile
description: Learn how to create, update, and manage AWS Transfer Profiles using Alchemy Cloud Control.
---


The Profile resource lets you manage [AWS Transfer Profiles](https://docs.aws.amazon.com/transfer/latest/userguide/) to facilitate secure file transfers using AWS Transfer Family.

## Minimal Example

Create a basic AWS Transfer Profile with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const transferProfile = await AWS.Transfer.Profile("basicProfile", {
  As2Id: "my-as2-id",
  ProfileType: "AS2",
  CertificateIds: ["cert-1234abcd"]
});
```

## Advanced Configuration

Configure a transfer profile with additional optional settings such as tags:

```ts
const advancedProfile = await AWS.Transfer.Profile("advancedProfile", {
  As2Id: "my-advanced-as2-id",
  ProfileType: "AS2",
  CertificateIds: ["cert-5678efgh"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Finance" }
  ]
});
```

## Adoption of Existing Resource

Create a transfer profile that adopts an existing resource instead of failing if it already exists:

```ts
const adoptedProfile = await AWS.Transfer.Profile("adoptedProfile", {
  As2Id: "existing-as2-id",
  ProfileType: "AS2",
  adopt: true
});
```

## Profile with Additional Metadata

Create a transfer profile while also capturing its ARN and timestamps for auditing:

```ts
const metadataProfile = await AWS.Transfer.Profile("metadataProfile", {
  As2Id: "my-metadata-as2-id",
  ProfileType: "AS2",
  CertificateIds: ["cert-9101ijkl"]
});

// Accessing additional metadata
console.log(`Profile ARN: ${metadataProfile.Arn}`);
console.log(`Creation Time: ${metadataProfile.CreationTime}`);
console.log(`Last Update Time: ${metadataProfile.LastUpdateTime}`);
```
