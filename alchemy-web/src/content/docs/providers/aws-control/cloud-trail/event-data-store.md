---
title: EventDataStore
description: Learn how to create, update, and manage AWS CloudTrail EventDataStores using Alchemy Cloud Control.
---


The EventDataStore resource lets you manage [AWS CloudTrail EventDataStores](https://docs.aws.amazon.com/cloudtrail/latest/userguide/) for storing and querying CloudTrail events.

## Minimal Example

Create a basic EventDataStore with essential properties.

```ts
import AWS from "alchemy/aws/control";

const eventDataStore = await AWS.CloudTrail.EventDataStore("basicEventDataStore", {
  name: "MyEventDataStore",
  multiRegionEnabled: true,
  retentionPeriod: 365 // Retain events for 365 days
});
```

## Advanced Configuration

Configure an EventDataStore with advanced options such as KMS key for encryption and insight selectors.

```ts
const advancedEventDataStore = await AWS.CloudTrail.EventDataStore("advancedEventDataStore", {
  name: "AdvancedEventDataStore",
  kmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
  advancedEventSelectors: [{
    name: "MyAdvancedSelector",
    fieldSelectors: [{
      field: "eventSource",
      equals: ["s3.amazonaws.com"]
    }]
  }],
  insightSelectors: [{
    insightType: "ApiCallRateInsight"
  }],
  federationEnabled: true,
  organizationEnabled: false
});
```

## Event Ingestion Enabled

Create an EventDataStore with ingestion enabled for capturing real-time events.

```ts
const ingestionEnabledEventDataStore = await AWS.CloudTrail.EventDataStore("ingestionEnabledEventDataStore", {
  name: "IngestionEnabledDataStore",
  ingestionEnabled: true,
  retentionPeriod: 180 // Retain events for 180 days
});
```

## Termination Protection

Set up an EventDataStore with termination protection enabled to prevent accidental deletion.

```ts
const protectedEventDataStore = await AWS.CloudTrail.EventDataStore("protectedEventDataStore", {
  name: "ProtectedEventDataStore",
  terminationProtectionEnabled: true,
  multiRegionEnabled: true
});
```
