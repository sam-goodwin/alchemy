---
title: LifecyclePolicy
description: Learn how to create, update, and manage AWS OpenSearchServerless LifecyclePolicys using Alchemy Cloud Control.
---


The LifecyclePolicy resource allows you to define and manage lifecycle policies for AWS OpenSearchServerless, which automate the management of your OpenSearch indices. For more information, refer to the [AWS OpenSearchServerless LifecyclePolicys](https://docs.aws.amazon.com/opensearchserverless/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic lifecycle policy with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicLifecyclePolicy = await AWS.OpenSearchServerless.LifecyclePolicy("basicLifecyclePolicy", {
  Name: "BasicPolicy",
  Policy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: "opensearch:ManageIndices",
      Resource: "*"
    }]
  }),
  Type: "SCHEDULED", // Example type for scheduled lifecycle actions
  Description: "A basic lifecycle policy for managing indices."
});
```

## Advanced Configuration

This example shows how to define a more complex lifecycle policy that includes additional rules for index management.

```ts
const advancedLifecyclePolicy = await AWS.OpenSearchServerless.LifecyclePolicy("advancedLifecyclePolicy", {
  Name: "AdvancedPolicy",
  Policy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: "opensearch:ManageIndices",
      Resource: "*",
      Condition: {
        "NumericLessThanEquals": {
          "opensearch:IndexAge": "30"
        }
      }
    }]
  }),
  Type: "SCHEDULED",
  Description: "An advanced lifecycle policy that manages indices based on age."
});
```

## Adoption of Existing Policy

This example illustrates how to adopt an existing lifecycle policy without failing if it already exists.

```ts
const adoptLifecyclePolicy = await AWS.OpenSearchServerless.LifecyclePolicy("adoptLifecyclePolicy", {
  Name: "ExistingPolicy",
  Policy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: "opensearch:ManageIndices",
      Resource: "*"
    }]
  }),
  Type: "SCHEDULED",
  Description: "Adopting an existing lifecycle policy.",
  adopt: true // Enables adoption of existing resource
});
```
