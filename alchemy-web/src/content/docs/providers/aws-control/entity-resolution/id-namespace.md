---
title: IdNamespace
description: Learn how to create, update, and manage AWS EntityResolution IdNamespaces using Alchemy Cloud Control.
---


The IdNamespace resource lets you create and manage [AWS EntityResolution IdNamespaces](https://docs.aws.amazon.com/entityresolution/latest/userguide/) for identifying and resolving entities across different data sources.

## Minimal Example

Create a basic IdNamespace with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicIdNamespace = await AWS.EntityResolution.IdNamespace("basicIdNamespace", {
  IdNamespaceName: "customer-namespace",
  Type: "customer",
  Description: "IdNamespace for customer entities"
});
```

## Advanced Configuration

Configure an IdNamespace with additional properties such as InputSourceConfig and IdMappingWorkflowProperties.

```ts
const advancedIdNamespace = await AWS.EntityResolution.IdNamespace("advancedIdNamespace", {
  IdNamespaceName: "order-namespace",
  Type: "order",
  Description: "IdNamespace for order entities",
  InputSourceConfig: [{
    SourceType: "csv",
    SourceUri: "s3://my-bucket/order-data.csv",
    InputFormat: "CSV"
  }],
  IdMappingWorkflowProperties: [{
    WorkflowType: "batch",
    WorkflowParameters: {
      BatchSize: 100,
      RetryAttempts: 3
    }
  }],
  RoleArn: "arn:aws:iam::123456789012:role/MyEntityResolutionRole"
});
```

## Adoption of Existing Resource

Create an IdNamespace that adopts an existing resource if it already exists.

```ts
const adoptIdNamespace = await AWS.EntityResolution.IdNamespace("adoptIdNamespace", {
  IdNamespaceName: "existing-namespace",
  Type: "supplier",
  adopt: true // Adopts the existing IdNamespace if present
});
```
