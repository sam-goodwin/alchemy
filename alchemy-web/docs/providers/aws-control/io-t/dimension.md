---
title: Managing AWS IoT Dimensions with Alchemy
description: Learn how to create, update, and manage AWS IoT Dimensions using Alchemy Cloud Control.
---

# Dimension

The Dimension resource lets you manage [AWS IoT Dimensions](https://docs.aws.amazon.com/iot/latest/userguide/) which are used to categorize IoT things for policies and other configurations.

## Minimal Example

Create a basic IoT Dimension with required properties and common optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicDimension = await AWS.IoT.Dimension("BasicDimension", {
  Type: "string",
  StringValues: ["DeviceTypeA", "DeviceTypeB"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Owner", Value: "TeamA" }
  ]
});
```

## Advanced Configuration

Configure an IoT Dimension with additional properties such as a custom name and a larger set of string values.

```ts
const advancedDimension = await AWS.IoT.Dimension("AdvancedDimension", {
  Type: "string",
  StringValues: [
    "DeviceTypeC",
    "DeviceTypeD",
    "DeviceTypeE",
    "DeviceTypeF"
  ],
  Name: "CustomDeviceCategory",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Owner", Value: "TeamB" }
  ]
});
```

## Resource Adoption

Create a Dimension and adopt an existing resource if it already exists.

```ts
const adoptedDimension = await AWS.IoT.Dimension("AdoptedDimension", {
  Type: "string",
  StringValues: ["DeviceTypeG"],
  adopt: true // Enables adoption of existing Dimension
});
```

## Using Tags for Organization

Create a Dimension that leverages tags for better organization and management.

```ts
const taggedDimension = await AWS.IoT.Dimension("TaggedDimension", {
  Type: "string",
  StringValues: ["DeviceTypeH"],
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Project", Value: "IoTApp" }
  ]
});
```