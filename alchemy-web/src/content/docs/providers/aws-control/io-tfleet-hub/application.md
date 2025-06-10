---
title: Application
description: Learn how to create, update, and manage AWS IoTFleetHub Applications using Alchemy Cloud Control.
---


The Application resource lets you manage [AWS IoTFleetHub Applications](https://docs.aws.amazon.com/iotfleethub/latest/userguide/) for monitoring and managing fleets of IoT devices.

## Minimal Example

Create a basic IoTFleetHub application with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicApplication = await AWS.IoTFleetHub.Application("basicFleetHubApp", {
  ApplicationName: "BasicFleetHubApplication",
  RoleArn: "arn:aws:iam::123456789012:role/MyIoTFleetHubRole",
  ApplicationDescription: "A simple IoTFleetHub application for managing IoT devices"
});
```

## Advanced Configuration

Configure a more advanced application with tags for better resource management.

```ts
const advancedApplication = await AWS.IoTFleetHub.Application("advancedFleetHubApp", {
  ApplicationName: "AdvancedFleetHubApplication",
  RoleArn: "arn:aws:iam::123456789012:role/MyIoTFleetHubRole",
  ApplicationDescription: "An advanced application with additional configurations.",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "IoT" }
  ]
});
```

## Adoption of Existing Resource

Create a new application that adopts an existing resource to avoid conflicts.

```ts
const adoptExistingApplication = await AWS.IoTFleetHub.Application("adoptFleetHubApp", {
  ApplicationName: "AdoptedFleetHubApplication",
  RoleArn: "arn:aws:iam::123456789012:role/MyIoTFleetHubRole",
  adopt: true // Adopts the existing resource if it already exists
});
```

## Custom Role Configuration

Create an application with a custom IAM role that grants specific permissions.

```ts
const customRoleApplication = await AWS.IoTFleetHub.Application("customRoleFleetHubApp", {
  ApplicationName: "CustomRoleFleetHubApplication",
  RoleArn: "arn:aws:iam::123456789012:role/CustomIoTFleetHubRole",
  ApplicationDescription: "Application with a custom IAM role for specific access.",
  Tags: [
    { Key: "AccessLevel", Value: "Admin" }
  ]
});
```
