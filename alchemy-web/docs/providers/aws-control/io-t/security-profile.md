---
title: Managing AWS IoT SecurityProfiles with Alchemy
description: Learn how to create, update, and manage AWS IoT SecurityProfiles using Alchemy Cloud Control.
---

# SecurityProfile

The SecurityProfile resource lets you create and manage [AWS IoT SecurityProfiles](https://docs.aws.amazon.com/iot/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-securityprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const securityprofile = await AWS.IoT.SecurityProfile("securityprofile-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a securityprofile with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSecurityProfile = await AWS.IoT.SecurityProfile("advanced-securityprofile", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

