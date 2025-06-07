---
title: Managing AWS RDS Integrations with Alchemy
description: Learn how to create, update, and manage AWS RDS Integrations using Alchemy Cloud Control.
---

# Integration

The Integration resource lets you manage [AWS RDS Integrations](https://docs.aws.amazon.com/rds/latest/userguide/) for linking RDS databases to external services or applications.

## Minimal Example

Create a basic RDS Integration with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicIntegration = await AWS.RDS.Integration("BasicIntegration", {
  SourceArn: "arn:aws:rds:us-east-1:123456789012:db:mydb",
  TargetArn: "arn:aws:s3:::mybucket",
  IntegrationName: "MyRDSIntegration"
});
```

## Advanced Configuration

Configure an RDS Integration with additional encryption context and tags for better management.

```ts
const advancedIntegration = await AWS.RDS.Integration("AdvancedIntegration", {
  SourceArn: "arn:aws:rds:us-east-1:123456789012:db:mydb",
  TargetArn: "arn:aws:s3:::mybucket",
  IntegrationName: "MyAdvancedRDSIntegration",
  KMSKeyId: "arn:aws:kms:us-east-1:123456789012:key/my-key-id",
  AdditionalEncryptionContext: {
    "Project": "DataIntegration",
    "Owner": "DevTeam"
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing RDS Integration without failing, set the `adopt` property to `true`.

```ts
const adoptedIntegration = await AWS.RDS.Integration("AdoptedIntegration", {
  SourceArn: "arn:aws:rds:us-east-1:123456789012:db:mydb",
  TargetArn: "arn:aws:s3:::mybucket",
  IntegrationName: "AdoptedIntegrationName",
  adopt: true
});
```