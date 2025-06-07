---
title: Managing AWS SageMaker Spaces with Alchemy
description: Learn how to create, update, and manage AWS SageMaker Spaces using Alchemy Cloud Control.
---

# Space

The Space resource lets you create and manage [AWS SageMaker Spaces](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-space.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const space = await AWS.SageMaker.Space("space-example", {
  DomainId: "example-domainid",
  SpaceName: "space-space",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a space with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSpace = await AWS.SageMaker.Space("advanced-space", {
  DomainId: "example-domainid",
  SpaceName: "space-space",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

