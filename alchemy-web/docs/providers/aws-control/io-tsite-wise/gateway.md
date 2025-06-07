---
title: Managing AWS IoTSiteWise Gateways with Alchemy
description: Learn how to create, update, and manage AWS IoTSiteWise Gateways using Alchemy Cloud Control.
---

# Gateway

The Gateway resource lets you create and manage [AWS IoTSiteWise Gateways](https://docs.aws.amazon.com/iotsitewise/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotsitewise-gateway.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const gateway = await AWS.IoTSiteWise.Gateway("gateway-example", {
  GatewayName: "gateway-gateway",
  GatewayPlatform: "example-gatewayplatform",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a gateway with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedGateway = await AWS.IoTSiteWise.Gateway("advanced-gateway", {
  GatewayName: "gateway-gateway",
  GatewayPlatform: "example-gatewayplatform",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

