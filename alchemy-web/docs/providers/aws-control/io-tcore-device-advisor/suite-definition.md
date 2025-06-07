---
title: Managing AWS IoTCoreDeviceAdvisor SuiteDefinitions with Alchemy
description: Learn how to create, update, and manage AWS IoTCoreDeviceAdvisor SuiteDefinitions using Alchemy Cloud Control.
---

# SuiteDefinition

The SuiteDefinition resource lets you create and manage [AWS IoTCoreDeviceAdvisor SuiteDefinitions](https://docs.aws.amazon.com/iotcoredeviceadvisor/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotcoredeviceadvisor-suitedefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const suitedefinition = await AWS.IoTCoreDeviceAdvisor.SuiteDefinition("suitedefinition-example", {
  SuiteDefinitionConfiguration: "example-suitedefinitionconfiguration",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a suitedefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSuiteDefinition = await AWS.IoTCoreDeviceAdvisor.SuiteDefinition(
  "advanced-suitedefinition",
  {
    SuiteDefinitionConfiguration: "example-suitedefinitionconfiguration",
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

