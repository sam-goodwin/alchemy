---
title: Managing AWS Greengrass DeviceDefinitionVersions with Alchemy
description: Learn how to create, update, and manage AWS Greengrass DeviceDefinitionVersions using Alchemy Cloud Control.
---

# DeviceDefinitionVersion

The DeviceDefinitionVersion resource lets you create and manage [AWS Greengrass DeviceDefinitionVersions](https://docs.aws.amazon.com/greengrass/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrass-devicedefinitionversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const devicedefinitionversion = await AWS.Greengrass.DeviceDefinitionVersion(
  "devicedefinitionversion-example",
  { DeviceDefinitionId: "example-devicedefinitionid", Devices: [] }
);
```

