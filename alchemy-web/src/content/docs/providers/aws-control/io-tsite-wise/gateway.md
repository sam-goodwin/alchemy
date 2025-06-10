---
title: Gateway
description: Learn how to create, update, and manage AWS IoTSiteWise Gateways using Alchemy Cloud Control.
---


The Gateway resource lets you manage [AWS IoTSiteWise Gateways](https://docs.aws.amazon.com/iotsitewise/latest/userguide/) for connecting industrial devices and applications to AWS IoT SiteWise.

## Minimal Example

Create a basic IoT SiteWise Gateway with required properties.

```ts
import AWS from "alchemy/aws/control";

const gateway = await AWS.IoTSiteWise.Gateway("myGateway", {
  gatewayName: "MyGateway",
  gatewayPlatform: {
    greengrass: {
      groupArn: "arn:aws:greengrass:us-east-1:123456789012:group/MyGreengrassGroup"
    }
  }
});
```

## Advanced Configuration

Configure a Gateway with capability summaries and tags to enhance its functionality.

```ts
const advancedGateway = await AWS.IoTSiteWise.Gateway("myAdvancedGateway", {
  gatewayName: "AdvancedGateway",
  gatewayPlatform: {
    greengrass: {
      groupArn: "arn:aws:greengrass:us-east-1:123456789012:group/MyGreengrassGroup"
    }
  },
  gatewayCapabilitySummaries: [
    {
      capabilityNamespace: "AWS:IoTSiteWise:Model",
      capabilityConfiguration: {
        image: "my-iot-image",
        modelId: "myModelId"
      }
    }
  ],
  tags: [
    {
      key: "Environment",
      value: "Production"
    },
    {
      key: "Owner",
      value: "TeamA"
    }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing gateway instead of failing when it already exists, set the `adopt` property.

```ts
const adoptedGateway = await AWS.IoTSiteWise.Gateway("existingGateway", {
  gatewayName: "ExistingGateway",
  gatewayPlatform: {
    greengrass: {
      groupArn: "arn:aws:greengrass:us-east-1:123456789012:group/MyGreengrassGroup"
    }
  },
  adopt: true
});
```
