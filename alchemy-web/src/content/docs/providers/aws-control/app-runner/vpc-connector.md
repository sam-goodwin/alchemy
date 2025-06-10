---
title: VpcConnector
description: Learn how to create, update, and manage AWS AppRunner VpcConnectors using Alchemy Cloud Control.
---


The VpcConnector resource allows you to manage [AWS AppRunner VpcConnectors](https://docs.aws.amazon.com/apprunner/latest/userguide/) that enable your AppRunner services to connect to your VPC resources securely.

## Minimal Example

Create a basic VpcConnector with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicVpcConnector = await AWS.AppRunner.VpcConnector("basicVpcConnector", {
  Subnets: ["subnet-0abcdef1234567890", "subnet-0abcdef0987654321"],
  SecurityGroups: ["sg-0abcdef1234567890"]
});
```

## Advanced Configuration

Configure a VpcConnector with additional options such as tags and a custom name.

```ts
const advancedVpcConnector = await AWS.AppRunner.VpcConnector("advancedVpcConnector", {
  Subnets: ["subnet-0abcdef1234567890"],
  SecurityGroups: ["sg-0abcdef1234567890"],
  VpcConnectorName: "MyCustomVpcConnector",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```

## Adopt Existing Resource

Create a VpcConnector that adopts an existing resource if it already exists.

```ts
const adoptedVpcConnector = await AWS.AppRunner.VpcConnector("adoptedVpcConnector", {
  Subnets: ["subnet-0abcdef1234567890"],
  SecurityGroups: ["sg-0abcdef1234567890"],
  adopt: true
});
```

## Using with AppRunner Service

Demonstrate how to use the VpcConnector with an AppRunner service.

```ts
const vpcConnector = await AWS.AppRunner.VpcConnector("serviceVpcConnector", {
  Subnets: ["subnet-0abcdef1234567890"],
  SecurityGroups: ["sg-0abcdef1234567890"]
});

const appRunnerService = await AWS.AppRunner.Service("myAppRunnerService", {
  ServiceName: "MyService",
  Source: {
    ImageRepository: {
      ImageIdentifier: "my-docker-repo/my-image:latest",
      ImageConfiguration: {
        Port: "8080"
      }
    }
  },
  VpcConnector: vpcConnector.Arn // Referencing the VpcConnector
});
```
