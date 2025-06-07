---
title: Managing AWS B2BI Transformers with Alchemy
description: Learn how to create, update, and manage AWS B2BI Transformers using Alchemy Cloud Control.
---

# Transformer

The Transformer resource lets you create and manage [AWS B2BI Transformers](https://docs.aws.amazon.com/b2bi/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-b2bi-transformer.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const transformer = await AWS.B2BI.Transformer("transformer-example", {
  Status: "example-status",
  Name: "transformer-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a transformer with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTransformer = await AWS.B2BI.Transformer("advanced-transformer", {
  Status: "example-status",
  Name: "transformer-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

