---
title: Managing AWS KafkaConnect CustomPlugins with Alchemy
description: Learn how to create, update, and manage AWS KafkaConnect CustomPlugins using Alchemy Cloud Control.
---

# CustomPlugin

The CustomPlugin resource lets you create and manage [AWS KafkaConnect CustomPlugins](https://docs.aws.amazon.com/kafkaconnect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kafkaconnect-customplugin.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const customplugin = await AWS.KafkaConnect.CustomPlugin("customplugin-example", {
  ContentType: "example-contenttype",
  Name: "customplugin-",
  Location: "example-location",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A customplugin resource managed by Alchemy",
});
```

## Advanced Configuration

Create a customplugin with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCustomPlugin = await AWS.KafkaConnect.CustomPlugin("advanced-customplugin", {
  ContentType: "example-contenttype",
  Name: "customplugin-",
  Location: "example-location",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A customplugin resource managed by Alchemy",
});
```

