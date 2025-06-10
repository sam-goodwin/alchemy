---
title: KeySigningKey
description: Learn how to create, update, and manage AWS Route53 KeySigningKeys using Alchemy Cloud Control.
---


The KeySigningKey resource allows you to manage [AWS Route53 KeySigningKeys](https://docs.aws.amazon.com/route53/latest/userguide/) for signing DNSSEC records.

## Minimal Example

Create a basic KeySigningKey with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const keySigningKey = await AWS.Route53.KeySigningKey("myKeySigningKey", {
  Status: "ACTIVE",
  KeyManagementServiceArn: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  HostedZoneId: "Z3M3LMN4V2M4FJ",
  Name: "MyKeySigningKey",
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a KeySigningKey with detailed properties, including status and KMS ARN.

```ts
const advancedKeySigningKey = await AWS.Route53.KeySigningKey("advancedKeySigningKey", {
  Status: "ACTIVE",
  KeyManagementServiceArn: "arn:aws:kms:us-west-2:123456789012:key/my-advanced-key-id",
  HostedZoneId: "Z3M3LMN4V2M4FJ",
  Name: "AdvancedKeySigningKey"
});
```

## Updating Key Signing Keys

Update an existing KeySigningKey's status to inactive while retaining its properties.

```ts
const updatedKeySigningKey = await AWS.Route53.KeySigningKey("myKeySigningKey", {
  Status: "INACTIVE",
  KeyManagementServiceArn: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  HostedZoneId: "Z3M3LMN4V2M4FJ",
  Name: "MyKeySigningKey"
});
```

## Deleting Key Signing Keys

Delete a KeySigningKey when it is no longer needed.

```ts
await AWS.Route53.KeySigningKey("myKeySigningKey", {
  Status: "DELETED",
  KeyManagementServiceArn: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  HostedZoneId: "Z3M3LMN4V2M4FJ",
  Name: "MyKeySigningKey"
});
```
