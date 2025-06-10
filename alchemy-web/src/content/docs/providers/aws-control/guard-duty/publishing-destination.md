---
title: PublishingDestination
description: Learn how to create, update, and manage AWS GuardDuty PublishingDestinations using Alchemy Cloud Control.
---


The PublishingDestination resource lets you manage [AWS GuardDuty PublishingDestinations](https://docs.aws.amazon.com/guardduty/latest/userguide/) for exporting findings to external destinations such as Amazon S3 or AWS Security Hub.

## Minimal Example

Create a basic PublishingDestination with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const publishingDestination = await AWS.GuardDuty.PublishingDestination("MyPublishingDestination", {
  DetectorId: "abcd1234efgh5678ijkl9012mnop3456qrstuvwx", // Replace with your actual detector ID
  DestinationType: "S3",
  DestinationProperties: {
    BucketArn: "arn:aws:s3:::my-guardduty-findings-bucket",
    KmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/my-kms-key" // Optional, if using KMS
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a PublishingDestination with additional properties including a KMS key for enhanced security.

```ts
const securePublishingDestination = await AWS.GuardDuty.PublishingDestination("SecurePublishingDestination", {
  DetectorId: "abcd1234efgh5678ijkl9012mnop3456qrstuvwx", // Replace with your actual detector ID
  DestinationType: "S3",
  DestinationProperties: {
    BucketArn: "arn:aws:s3:::my-secure-guardduty-findings-bucket",
    KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/my-secure-kms-key" // Specify KMS key for encryption
  },
  Tags: [
    {
      Key: "Project",
      Value: "GuardDuty"
    },
    {
      Key: "Confidentiality",
      Value: "High"
    }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing PublishingDestination without failing, you can set the `adopt` property to true.

```ts
const existingPublishingDestination = await AWS.GuardDuty.PublishingDestination("AdoptExistingDestination", {
  DetectorId: "abcd1234efgh5678ijkl9012mnop3456qrstuvwx", // Replace with your actual detector ID
  DestinationType: "S3",
  DestinationProperties: {
    BucketArn: "arn:aws:s3:::my-existing-guardduty-findings-bucket"
  },
  adopt: true // Adopt existing resource
});
```
