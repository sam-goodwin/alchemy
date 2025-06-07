---
title: Managing AWS AmazonMQ Configurations with Alchemy
description: Learn how to create, update, and manage AWS AmazonMQ Configurations using Alchemy Cloud Control.
---

# Configuration

The Configuration resource lets you create and manage [AWS AmazonMQ Configurations](https://docs.aws.amazon.com/amazonmq/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amazonmq-configuration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const configuration = await AWS.AmazonMQ.Configuration("configuration-example", {
  EngineType: "example-enginetype",
  Name: "configuration-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A configuration resource managed by Alchemy",
});
```

## Advanced Configuration

Create a configuration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConfiguration = await AWS.AmazonMQ.Configuration("advanced-configuration", {
  EngineType: "example-enginetype",
  Name: "configuration-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A configuration resource managed by Alchemy",
});
```

