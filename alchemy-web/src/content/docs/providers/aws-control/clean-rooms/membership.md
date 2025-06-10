---
title: Membership
description: Learn how to create, update, and manage AWS CleanRooms Memberships using Alchemy Cloud Control.
---


The Membership resource allows you to manage [AWS CleanRooms Memberships](https://docs.aws.amazon.com/cleanrooms/latest/userguide/) that enable collaboration across data in a secure environment.

## Minimal Example

Create a basic membership with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicMembership = await AWS.CleanRooms.Membership("basicMembership", {
  CollaborationIdentifier: "collaboration-12345",
  QueryLogStatus: "ENABLED",
  JobLogStatus: "DISABLED"
});
```

## Advanced Configuration

Configure a membership with a default result configuration and payment configuration for enhanced settings.

```ts
const advancedMembership = await AWS.CleanRooms.Membership("advancedMembership", {
  CollaborationIdentifier: "collaboration-12345",
  QueryLogStatus: "ENABLED",
  DefaultResultConfiguration: {
    OutputFormat: "PARQUET",
    EncryptionConfiguration: {
      EncryptionOption: "SSE_S3"
    }
  },
  PaymentConfiguration: {
    PaymentMethod: "CREDIT_CARD",
    BillingAddress: {
      AddressLine1: "123 Main St",
      City: "Seattle",
      State: "WA",
      ZipCode: "98101",
      Country: "US"
    }
  },
  Tags: [
    { Key: "Project", Value: "Data Collaboration" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Custom Job Result Configuration

Set the membership with a custom job result configuration to specify output behavior.

```ts
const customJobConfigMembership = await AWS.CleanRooms.Membership("customJobConfigMembership", {
  CollaborationIdentifier: "collaboration-12345",
  QueryLogStatus: "ENABLED",
  DefaultJobResultConfiguration: {
    OutputLocation: "s3://my-bucket/results/",
    OutputFormat: "CSV",
    CompressionType: "GZIP"
  }
});
```

## Using Tags for Resource Management

Create a membership with tags for better resource organization and management.

```ts
const taggedMembership = await AWS.CleanRooms.Membership("taggedMembership", {
  CollaborationIdentifier: "collaboration-12345",
  QueryLogStatus: "ENABLED",
  Tags: [
    { Key: "Owner", Value: "DataTeam" },
    { Key: "Purpose", Value: "Data Sharing" }
  ]
});
```
