---
title: Managing AWS Redshift Integrations with Alchemy
description: Learn how to create, update, and manage AWS Redshift Integrations using Alchemy Cloud Control.
---

# Integration

The Integration resource lets you manage [AWS Redshift Integrations](https://docs.aws.amazon.com/redshift/latest/userguide/) for connecting various data sources and targets securely.

## Minimal Example

Create a basic Redshift Integration with required properties and a KMS Key ID.

```ts
import AWS from "alchemy/aws/control";

const basicRedshiftIntegration = await AWS.Redshift.Integration("BasicRedshiftIntegration", {
  SourceArn: "arn:aws:redshift:us-west-2:123456789012:cluster:my-cluster",
  TargetArn: "arn:aws:s3:::my-data-bucket",
  KMSKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Advanced Configuration

Configure a Redshift Integration with additional encryption context for enhanced security.

```ts
const advancedRedshiftIntegration = await AWS.Redshift.Integration("AdvancedRedshiftIntegration", {
  SourceArn: "arn:aws:redshift:us-west-2:123456789012:cluster:my-cluster",
  TargetArn: "arn:aws:s3:::my-secure-data-bucket",
  KMSKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
  AdditionalEncryptionContext: {
    "userId": "user123",
    "sessionId": "session456"
  },
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DataAnalytics" }
  ]
});
```

## Adoption of Existing Resources

Adopt an existing Redshift Integration if it already exists without failing.

```ts
const adoptExistingIntegration = await AWS.Redshift.Integration("AdoptExistingIntegration", {
  SourceArn: "arn:aws:redshift:us-west-2:123456789012:cluster:my-cluster",
  TargetArn: "arn:aws:s3:::my-existing-bucket",
  adopt: true
});
```

## Using Tags for Resource Management

Create a Redshift Integration while utilizing tags for better resource management and tracking.

```ts
const taggedRedshiftIntegration = await AWS.Redshift.Integration("TaggedRedshiftIntegration", {
  SourceArn: "arn:aws:redshift:us-west-2:123456789012:cluster:my-cluster",
  TargetArn: "arn:aws:s3:::my-tagged-bucket",
  KMSKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
  Tags: [
    { Key: "Project", Value: "DataMigration" },
    { Key: "Owner", Value: "Alice" }
  ]
});
```