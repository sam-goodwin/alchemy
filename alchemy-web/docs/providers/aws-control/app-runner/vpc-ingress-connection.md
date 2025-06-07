---
title: Managing AWS AppRunner VpcIngressConnections with Alchemy
description: Learn how to create, update, and manage AWS AppRunner VpcIngressConnections using Alchemy Cloud Control.
---

# VpcIngressConnection

The VpcIngressConnection resource lets you create and manage [AWS AppRunner VpcIngressConnections](https://docs.aws.amazon.com/apprunner/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apprunner-vpcingressconnection.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const vpcingressconnection = await AWS.AppRunner.VpcIngressConnection(
  "vpcingressconnection-example",
  {
    ServiceArn: "example-servicearn",
    IngressVpcConfiguration: "example-ingressvpcconfiguration",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a vpcingressconnection with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVpcIngressConnection = await AWS.AppRunner.VpcIngressConnection(
  "advanced-vpcingressconnection",
  {
    ServiceArn: "example-servicearn",
    IngressVpcConfiguration: "example-ingressvpcconfiguration",
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

