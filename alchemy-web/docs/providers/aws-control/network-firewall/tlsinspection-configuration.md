---
title: Managing AWS NetworkFirewall TLSInspectionConfigurations with Alchemy
description: Learn how to create, update, and manage AWS NetworkFirewall TLSInspectionConfigurations using Alchemy Cloud Control.
---

# TLSInspectionConfiguration

The TLSInspectionConfiguration resource lets you create and manage [AWS NetworkFirewall TLSInspectionConfigurations](https://docs.aws.amazon.com/networkfirewall/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkfirewall-tlsinspectionconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const tlsinspectionconfiguration = await AWS.NetworkFirewall.TLSInspectionConfiguration(
  "tlsinspectionconfiguration-example",
  {
    TLSInspectionConfigurationName: "tlsinspectionconfiguration-tlsinspectionconfiguration",
    TLSInspectionConfiguration: "example-tlsinspectionconfiguration",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A tlsinspectionconfiguration resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a tlsinspectionconfiguration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTLSInspectionConfiguration = await AWS.NetworkFirewall.TLSInspectionConfiguration(
  "advanced-tlsinspectionconfiguration",
  {
    TLSInspectionConfigurationName: "tlsinspectionconfiguration-tlsinspectionconfiguration",
    TLSInspectionConfiguration: "example-tlsinspectionconfiguration",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A tlsinspectionconfiguration resource managed by Alchemy",
  }
);
```

