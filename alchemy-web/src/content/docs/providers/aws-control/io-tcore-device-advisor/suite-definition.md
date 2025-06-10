---
title: SuiteDefinition
description: Learn how to create, update, and manage AWS IoTCoreDeviceAdvisor SuiteDefinitions using Alchemy Cloud Control.
---


The SuiteDefinition resource allows you to create and manage [AWS IoTCoreDeviceAdvisor SuiteDefinitions](https://docs.aws.amazon.com/iotcoredeviceadvisor/latest/userguide/) for testing and validating your IoT devices.

## Minimal Example

Create a basic SuiteDefinition with required properties and a couple of optional ones.

```ts
import AWS from "alchemy/aws/control";

const suiteDefinition = await AWS.IoTCoreDeviceAdvisor.SuiteDefinition("basicSuiteDefinition", {
  SuiteDefinitionConfiguration: {
    suiteDefinition: {
      name: "Basic Suite",
      description: "A basic suite for testing IoT devices"
    }
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Test"
    }
  ]
});
```

## Advanced Configuration

Configure a SuiteDefinition with more advanced settings, including additional tags and a detailed configuration.

```ts
const advancedSuiteDefinition = await AWS.IoTCoreDeviceAdvisor.SuiteDefinition("advancedSuiteDefinition", {
  SuiteDefinitionConfiguration: {
    suiteDefinition: {
      name: "Advanced Suite",
      description: "An advanced suite for comprehensive IoT device testing",
      testCases: [
        {
          name: "Test Case 1",
          description: "Validates device connectivity",
          expectedResults: {
            success: true
          }
        },
        {
          name: "Test Case 2",
          description: "Checks data transmission",
          expectedResults: {
            success: true
          }
        }
      ]
    }
  },
  Tags: [
    {
      Key: "Project",
      Value: "IoTProject"
    },
    {
      Key: "Owner",
      Value: "TeamA"
    }
  ],
  adopt: true
});
```

## Usage with Existing Resources

Adopt an existing SuiteDefinition if it already exists, preventing failures during creation.

```ts
const existingSuiteDefinition = await AWS.IoTCoreDeviceAdvisor.SuiteDefinition("existingSuiteDefinition", {
  SuiteDefinitionConfiguration: {
    suiteDefinition: {
      name: "Existing Suite",
      description: "This suite is adopted from existing resources"
    }
  },
  adopt: true
});
```
