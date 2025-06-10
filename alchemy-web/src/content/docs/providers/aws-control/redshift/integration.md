---
title: Integration
description: Learn how to create, update, and manage AWS Redshift Integrations using Alchemy Cloud Control.
---


The Integration resource allows you to manage [AWS Redshift Integrations](https://docs.aws.amazon.com/redshift/latest/userguide/) for secure data sharing between AWS services and your Redshift cluster.

## Minimal Example

Create a basic Redshift integration with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const redshiftIntegration = await AWS.Redshift.Integration("basicIntegration", {
  SourceArn: "arn:aws:s3:::my-data-bucket",
  TargetArn: "arn:aws:redshift:us-west-2:123456789012:cluster:my-cluster",
  KMSKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-key-id" // Optional
});
```

## Advanced Configuration

Configure a Redshift integration with additional encryption context and tags for better management.

```ts
const advancedIntegration = await AWS.Redshift.Integration("advancedIntegration", {
  SourceArn: "arn:aws:s3:::my-secure-data-bucket",
  TargetArn: "arn:aws:redshift:us-west-2:123456789012:cluster:my-cluster",
  KMSKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  AdditionalEncryptionContext: {
    "Project": "DataPipeline",
    "Environment": "Production"
  },
  Tags: [
    { Key: "Owner", Value: "DataTeam" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Adoption of Existing Resources

If you want to adopt an existing Redshift integration rather than creating a new one, you can set the `adopt` flag to true.

```ts
const adoptIntegration = await AWS.Redshift.Integration("adoptedIntegration", {
  SourceArn: "arn:aws:s3:::existing-bucket",
  TargetArn: "arn:aws:redshift:us-west-2:123456789012:cluster:my-cluster",
  adopt: true // This will adopt the existing resource if it exists
});
```
