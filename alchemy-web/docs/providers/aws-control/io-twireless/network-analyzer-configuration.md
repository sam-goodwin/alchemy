---
title: Managing AWS IoTWireless NetworkAnalyzerConfigurations with Alchemy
description: Learn how to create, update, and manage AWS IoTWireless NetworkAnalyzerConfigurations using Alchemy Cloud Control.
---

# NetworkAnalyzerConfiguration

The NetworkAnalyzerConfiguration resource lets you create and manage [AWS IoTWireless NetworkAnalyzerConfigurations](https://docs.aws.amazon.com/iotwireless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotwireless-networkanalyzerconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const networkanalyzerconfiguration = await AWS.IoTWireless.NetworkAnalyzerConfiguration(
  "networkanalyzerconfiguration-example",
  {
    Name: "networkanalyzerconfiguration-",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A networkanalyzerconfiguration resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a networkanalyzerconfiguration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedNetworkAnalyzerConfiguration = await AWS.IoTWireless.NetworkAnalyzerConfiguration(
  "advanced-networkanalyzerconfiguration",
  {
    Name: "networkanalyzerconfiguration-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A networkanalyzerconfiguration resource managed by Alchemy",
  }
);
```

