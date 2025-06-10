---
title: Dimension
description: Learn how to create, update, and manage AWS IoT Dimensions using Alchemy Cloud Control.
---


The Dimension resource allows you to manage [AWS IoT Dimensions](https://docs.aws.amazon.com/iot/latest/userguide/) that help in categorizing and filtering IoT data streams effectively.

## Minimal Example

This example demonstrates how to create a basic IoT Dimension with required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicDimension = await AWS.IoT.Dimension("basicDimension", {
  Type: "string",
  StringValues: ["sensor", "device", "location"],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

In this example, we create an IoT Dimension with additional properties including a unique name and multiple string values.

```ts
const advancedDimension = await AWS.IoT.Dimension("advancedDimension", {
  Type: "string",
  StringValues: ["temperature", "humidity", "pressure"],
  Name: "EnvironmentalParameters",
  Tags: [
    {
      Key: "Application",
      Value: "WeatherMonitoring"
    },
    {
      Key: "Department",
      Value: "Research"
    }
  ]
});
```

## Adoption of Existing Resource

This example demonstrates how to adopt an existing IoT Dimension instead of failing when the resource already exists.

```ts
const adoptedDimension = await AWS.IoT.Dimension("adoptedDimension", {
  Type: "string",
  StringValues: ["existingValue"],
  adopt: true // This will adopt the existing dimension if it exists
});
```

## Using Dimensions in IoT Rules

Here’s how to reference an IoT Dimension within an IoT Rule to filter messages based on dimension values.

```ts
import AWS from "alchemy/aws/control";

const iotRule = await AWS.IoT.Rule("temperatureAlertRule", {
  RuleName: "TemperatureAlert",
  Sql: "SELECT * FROM 'sensor/temperature' WHERE dimension = 'high'",
  Actions: [
    {
      Lambda: {
        FunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:alertFunction"
      }
    }
  ],
  Tags: [
    {
      Key: "Status",
      Value: "Active"
    }
  ]
});
```
