---
title: Managing AWS WAFv2 LoggingConfigurations with Alchemy
description: Learn how to create, update, and manage AWS WAFv2 LoggingConfigurations using Alchemy Cloud Control.
---

# LoggingConfiguration

The LoggingConfiguration resource lets you create and manage [AWS WAFv2 LoggingConfigurations](https://docs.aws.amazon.com/wafv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafv2-loggingconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const loggingconfiguration = await AWS.WAFv2.LoggingConfiguration("loggingconfiguration-example", {
  ResourceArn: "example-resourcearn",
  LogDestinationConfigs: ["example-logdestinationconfigs-1"],
});
```

