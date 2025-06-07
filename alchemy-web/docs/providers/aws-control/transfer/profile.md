---
title: Managing AWS Transfer Profiles with Alchemy
description: Learn how to create, update, and manage AWS Transfer Profiles using Alchemy Cloud Control.
---

# Profile

The Profile resource allows you to manage [AWS Transfer Profiles](https://docs.aws.amazon.com/transfer/latest/userguide/) which are used for configuring your AWS Transfer Family service integrations.

## Minimal Example

Create a basic transfer profile with required properties:

```ts
import AWS from "alchemy/aws/control";

const BasicTransferProfile = await AWS.Transfer.Profile("BasicTransferProfile", {
  As2Id: "AS2-123456789",
  ProfileType: "AS2",
  CertificateIds: ["cert-abcdefg"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Transfer" }
  ]
});
```

## Advanced Configuration

Configure a transfer profile with additional options for certificates and tags:

```ts
const AdvancedTransferProfile = await AWS.Transfer.Profile("AdvancedTransferProfile", {
  As2Id: "AS2-987654321",
  ProfileType: "AS2",
  CertificateIds: ["cert-hijklmnop", "cert-qrstuvwxyz"],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Transfer" },
    { Key: "Project", Value: "DataExchange" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing AWS Transfer Profile instead of creating a new one, you can set the `adopt` property to true:

```ts
const AdoptedTransferProfile = await AWS.Transfer.Profile("AdoptedTransferProfile", {
  As2Id: "AS2-543216789",
  ProfileType: "AS2",
  adopt: true
});
```

## Profile with Multiple Certificates

Create a transfer profile that utilizes multiple certificates for enhanced security:

```ts
const MultiCertTransferProfile = await AWS.Transfer.Profile("MultiCertTransferProfile", {
  As2Id: "AS2-321654987",
  ProfileType: "AS2",
  CertificateIds: ["cert-abc123", "cert-def456"],
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Transfer" }
  ]
});
```