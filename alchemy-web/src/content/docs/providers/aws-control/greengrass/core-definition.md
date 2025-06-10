---
title: CoreDefinition
description: Learn how to create, update, and manage AWS Greengrass CoreDefinitions using Alchemy Cloud Control.
---


The CoreDefinition resource lets you manage [AWS Greengrass CoreDefinitions](https://docs.aws.amazon.com/greengrass/latest/userguide/) which define the core devices in your Greengrass group.

## Minimal Example

Create a basic CoreDefinition with required properties and an optional initial version.

```ts
import AWS from "alchemy/aws/control";

const coreDefinition = await AWS.Greengrass.CoreDefinition("myCoreDefinition", {
  name: "MyCoreDefinition",
  initialVersion: {
    cores: [{
      id: "myCoreDevice",
      certificateArn: "arn:aws:iot:us-west-2:123456789012:cert/abcd1234efgh5678ijkl9012mnop3456qrst7890uvwx",
      idCertificateArn: "arn:aws:iot:us-west-2:123456789012:cert/abcd1234efgh5678ijkl9012mnop3456qrst7890uvwx",
      thingArn: "arn:aws:iot:us-west-2:123456789012:thing/MyCoreDevice"
    }]
  },
  tags: {
    Environment: "Production",
    Team: "IoT"
  }
});
```

## Advanced Configuration

Configure a CoreDefinition with multiple core devices and additional settings.

```ts
const advancedCoreDefinition = await AWS.Greengrass.CoreDefinition("advancedCoreDefinition", {
  name: "AdvancedCoreDefinition",
  initialVersion: {
    cores: [{
      id: "coreDevice1",
      certificateArn: "arn:aws:iot:us-west-2:123456789012:cert/abcd1234efgh5678ijkl9012mnop3456qrst7890uvwx",
      idCertificateArn: "arn:aws:iot:us-west-2:123456789012:cert/abcd1234efgh5678ijkl9012mnop3456qrst7890uvwx",
      thingArn: "arn:aws:iot:us-west-2:123456789012:thing/CoreDevice1"
    },
    {
      id: "coreDevice2",
      certificateArn: "arn:aws:iot:us-west-2:123456789012:cert/wxyz9876mnop1234ijkl5678efgh9012qrst3456uvwx",
      idCertificateArn: "arn:aws:iot:us-west-2:123456789012:cert/wxyz9876mnop1234ijkl5678efgh9012qrst3456uvwx",
      thingArn: "arn:aws:iot:us-west-2:123456789012:thing/CoreDevice2"
    }]
  },
  tags: {
    Environment: "Development",
    Team: "IoT"
  },
  adopt: true // Allow adoption of existing CoreDefinition if it already exists
});
```

## Custom Core Device Configuration

Create a CoreDefinition that includes specific configurations for a core device.

```ts
const customCoreDefinition = await AWS.Greengrass.CoreDefinition("customCoreDefinition", {
  name: "CustomCoreDefinition",
  initialVersion: {
    cores: [{
      id: "customCoreDevice",
      certificateArn: "arn:aws:iot:us-west-2:123456789012:cert/abcd1234efgh5678ijkl9012mnop3456qrst7890uvwx",
      idCertificateArn: "arn:aws:iot:us-west-2:123456789012:cert/abcd1234efgh5678ijkl9012mnop3456qrst7890uvwx",
      thingArn: "arn:aws:iot:us-west-2:123456789012:thing/CustomCoreDevice",
      // Additional properties can be added if needed
    }]
  }
});
```

This demonstrates how to create a CoreDefinition resource in AWS Greengrass using Alchemy, allowing you to manage your IoT devices effectively.
