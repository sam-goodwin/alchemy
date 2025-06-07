---
title: Managing AWS IVS RecordingConfigurations with Alchemy
description: Learn how to create, update, and manage AWS IVS RecordingConfigurations using Alchemy Cloud Control.
---

# RecordingConfiguration

The RecordingConfiguration resource lets you create and manage [AWS IVS RecordingConfigurations](https://docs.aws.amazon.com/ivs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ivs-recordingconfiguration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const recordingconfiguration = await AWS.IVS.RecordingConfiguration(
  "recordingconfiguration-example",
  {
    DestinationConfiguration: "example-destinationconfiguration",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a recordingconfiguration with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRecordingConfiguration = await AWS.IVS.RecordingConfiguration(
  "advanced-recordingconfiguration",
  {
    DestinationConfiguration: "example-destinationconfiguration",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

