---
title: Managing AWS Bedrock FlowAliass with Alchemy
description: Learn how to create, update, and manage AWS Bedrock FlowAliass using Alchemy Cloud Control.
---

# FlowAlias

The FlowAlias resource lets you create and manage [AWS Bedrock FlowAliass](https://docs.aws.amazon.com/bedrock/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-flowalias.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const flowalias = await AWS.Bedrock.FlowAlias("flowalias-example", {
  RoutingConfiguration: [],
  FlowArn: "example-flowarn",
  Name: "flowalias-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A flowalias resource managed by Alchemy",
});
```

## Advanced Configuration

Create a flowalias with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFlowAlias = await AWS.Bedrock.FlowAlias("advanced-flowalias", {
  RoutingConfiguration: [],
  FlowArn: "example-flowarn",
  Name: "flowalias-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A flowalias resource managed by Alchemy",
});
```

