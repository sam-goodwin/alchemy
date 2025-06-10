---
title: Domain
description: Learn how to create, update, and manage AWS VoiceID Domains using Alchemy Cloud Control.
---


The Domain resource lets you manage [AWS VoiceID Domains](https://docs.aws.amazon.com/voiceid/latest/userguide/) for voice authentication and verification. This resource allows you to create and configure domains that can help in managing voice recognition tasks.

## Minimal Example

Create a basic VoiceID Domain with required properties and an optional description.

```ts
import AWS from "alchemy/aws/control";

const voiceIdDomain = await AWS.VoiceID.Domain("voiceIdDomain", {
  Name: "myVoiceIdDomain",
  ServerSideEncryptionConfiguration: {
    KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
    EncryptionMode: "KMS"
  },
  Description: "This domain handles voice authentication for customer support."
});
```

## Advanced Configuration

Configure a VoiceID Domain with additional tags for resource management.

```ts
const advancedVoiceIdDomain = await AWS.VoiceID.Domain("advancedVoiceIdDomain", {
  Name: "advancedVoiceIdDomain",
  ServerSideEncryptionConfiguration: {
    KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
    EncryptionMode: "KMS"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "CustomerSupport" }
  ],
  Description: "Advanced domain configuration with tags for resource tracking."
});
```

## Resource Adoption

Create a VoiceID Domain with the option to adopt an existing resource if it already exists.

```ts
const adoptVoiceIdDomain = await AWS.VoiceID.Domain("adoptVoiceIdDomain", {
  Name: "existingVoiceIdDomain",
  ServerSideEncryptionConfiguration: {
    KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
    EncryptionMode: "KMS"
  },
  adopt: true // This will prevent failure if the resource already exists
});
```
