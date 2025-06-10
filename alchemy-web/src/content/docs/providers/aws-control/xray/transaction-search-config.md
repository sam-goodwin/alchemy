---
title: TransactionSearchConfig
description: Learn how to create, update, and manage AWS XRay TransactionSearchConfigs using Alchemy Cloud Control.
---


The TransactionSearchConfig resource allows you to manage the configuration settings for AWS X-Ray transaction search. This resource can be used to control the indexing percentage for transaction data. For more information, refer to the [AWS XRay TransactionSearchConfigs documentation](https://docs.aws.amazon.com/xray/latest/userguide/).

## Minimal Example

Create a basic TransactionSearchConfig with the default indexing percentage.

```ts
import AWS from "alchemy/aws/control";

const basicTransactionSearchConfig = await AWS.XRay.TransactionSearchConfig("basic-config", {
  IndexingPercentage: 50,
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a TransactionSearchConfig with a higher indexing percentage.

```ts
const advancedTransactionSearchConfig = await AWS.XRay.TransactionSearchConfig("advanced-config", {
  IndexingPercentage: 75,
  adopt: false // Do not adopt existing resource, fail if it exists
});
```

## Monitoring Configuration Changes

Create a TransactionSearchConfig while monitoring changes with creation and update timestamps.

```ts
const monitoredTransactionSearchConfig = await AWS.XRay.TransactionSearchConfig("monitored-config", {
  IndexingPercentage: 100,
  adopt: true // Adopt existing resource if it already exists
});

// Accessing additional properties
console.log(`ARN: ${monitoredTransactionSearchConfig.Arn}`);
console.log(`Created At: ${monitoredTransactionSearchConfig.CreationTime}`);
console.log(`Last Updated At: ${monitoredTransactionSearchConfig.LastUpdateTime}`);
```
