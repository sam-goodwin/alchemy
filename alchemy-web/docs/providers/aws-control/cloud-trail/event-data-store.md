---
title: Managing AWS CloudTrail EventDataStores with Alchemy
description: Learn how to create, update, and manage AWS CloudTrail EventDataStores using Alchemy Cloud Control.
---

# EventDataStore

The EventDataStore resource allows you to create and manage [AWS CloudTrail EventDataStores](https://docs.aws.amazon.com/cloudtrail/latest/userguide/) for centralized logging of events in your AWS account.

## Minimal Example

This example demonstrates how to create a basic EventDataStore with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicEventDataStore = await AWS.CloudTrail.EventDataStore("BasicEventDataStore", {
  Name: "MyEventDataStore",
  MultiRegionEnabled: true,
  RetentionPeriod: 365,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Advanced Configuration

In this example, we configure an EventDataStore with advanced options, including custom KMS key for encryption and advanced event selectors.

```ts
const AdvancedEventDataStore = await AWS.CloudTrail.EventDataStore("AdvancedEventDataStore", {
  Name: "SecureEventDataStore",
  KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/some-key-id",
  MultiRegionEnabled: true,
  AdvancedEventSelectors: [
    {
      Name: "AdvancedSelector1",
      FieldSelectors: [
        {
          Field: "eventCategory",
          Equals: ["Management"]
        },
        {
          Field: "eventSource",
          Equals: ["ec2.amazonaws.com"]
        }
      ]
    }
  ],
  RetentionPeriod: 730,
  TerminationProtectionEnabled: true,
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Federation and Insights Configuration

This example shows how to enable federation and define insight selectors for the EventDataStore.

```ts
const FederatedEventDataStore = await AWS.CloudTrail.EventDataStore("FederatedEventDataStore", {
  Name: "FederatedEventStore",
  FederationEnabled: true,
  FederationRoleArn: "arn:aws:iam::123456789012:role/MyFederationRole",
  InsightSelectors: [
    {
      InsightType: "ApiCallRateInsight"
    }
  ],
  IngestionEnabled: true,
  RetentionPeriod: 180,
  Tags: [
    { Key: "Environment", Value: "Testing" },
    { Key: "Team", Value: "Compliance" }
  ]
});
```