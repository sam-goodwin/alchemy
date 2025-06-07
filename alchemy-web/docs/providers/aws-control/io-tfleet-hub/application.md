---
title: Managing AWS IoTFleetHub Applications with Alchemy
description: Learn how to create, update, and manage AWS IoTFleetHub Applications using Alchemy Cloud Control.
---

# Application

The Application resource allows you to manage [AWS IoTFleetHub Applications](https://docs.aws.amazon.com/iotfleethub/latest/userguide/) which enable you to build and deploy applications for monitoring and managing your IoT devices.

## Minimal Example

Create a basic IoTFleetHub Application with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const IoTFleetHubApp = await AWS.IoTFleetHub.Application("MyFirstIoTFleetHubApp", {
  ApplicationName: "MyIoTApp",
  RoleArn: "arn:aws:iam::123456789012:role/MyIoTFleetHubRole",
  Tags: [{ Key: "Environment", Value: "development" }]
});
```

## Advanced Configuration

Configure an IoTFleetHub Application with a description and multiple tags.

```ts
const AdvancedIoTFleetHubApp = await AWS.IoTFleetHub.Application("AdvancedIoTFleetHubApp", {
  ApplicationName: "AdvancedIoTApp",
  ApplicationDescription: "An advanced IoT application for monitoring.",
  RoleArn: "arn:aws:iam::123456789012:role/MyAdvancedIoTFleetHubRole",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "IoT" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing IoTFleetHub Application instead of failing when it already exists.

```ts
const ExistingIoTFleetHubApp = await AWS.IoTFleetHub.Application("AdoptExistingIoTFleetHubApp", {
  ApplicationName: "ExistingIoTApp",
  RoleArn: "arn:aws:iam::123456789012:role/MyExistingIoTFleetHubRole",
  adopt: true
});
```

## Application Role Policy

Define a role policy to grant permissions necessary for the IoTFleetHub Application to interact with other AWS services.

```ts
const IoTFleetHubAppRolePolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: [
        "iot:DescribeEndpoint",
        "iot:ListThings",
        "iot:ListThingsInBatch"
      ],
      Resource: "*"
    }
  ]
};

// Attach the policy to the RoleArn used in the application
```