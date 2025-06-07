---
title: Managing AWS XRay TransactionSearchConfigs with Alchemy
description: Learn how to create, update, and manage AWS XRay TransactionSearchConfigs using Alchemy Cloud Control.
---

# TransactionSearchConfig

The TransactionSearchConfig resource allows you to manage configurations for AWS XRay transaction search capabilities. You can learn more about this resource in the [AWS XRay TransactionSearchConfigs documentation](https://docs.aws.amazon.com/xray/latest/userguide/).

## Minimal Example

Create a basic TransactionSearchConfig with default settings and a specified indexing percentage.

```ts
import AWS from "alchemy/aws/control";

const BasicTransactionSearchConfig = await AWS.XRay.TransactionSearchConfig("BasicTransactionSearchConfig", {
  IndexingPercentage: 50,
  adopt: false // Default is false
});
```

## Advanced Configuration

Configure a TransactionSearchConfig with a high indexing percentage for improved search capabilities.

```ts
const AdvancedTransactionSearchConfig = await AWS.XRay.TransactionSearchConfig("AdvancedTransactionSearchConfig", {
  IndexingPercentage: 90,
  adopt: false // Default is false
});
```

## Resource Adoption

Create a TransactionSearchConfig that adopts an existing resource rather than failing if it already exists.

```ts
const AdoptedTransactionSearchConfig = await AWS.XRay.TransactionSearchConfig("AdoptedTransactionSearchConfig", {
  IndexingPercentage: 70,
  adopt: true // Enables adoption of existing resources
});
```