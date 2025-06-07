---
title: Managing AWS Connect SecurityProfiles with Alchemy
description: Learn how to create, update, and manage AWS Connect SecurityProfiles using Alchemy Cloud Control.
---

# SecurityProfile

The SecurityProfile resource lets you create and manage [AWS Connect SecurityProfiles](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-securityprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const securityprofile = await AWS.Connect.SecurityProfile("securityprofile-example", {
  InstanceArn: "example-instancearn",
  SecurityProfileName: "securityprofile-securityprofile",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A securityprofile resource managed by Alchemy",
});
```

## Advanced Configuration

Create a securityprofile with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSecurityProfile = await AWS.Connect.SecurityProfile("advanced-securityprofile", {
  InstanceArn: "example-instancearn",
  SecurityProfileName: "securityprofile-securityprofile",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A securityprofile resource managed by Alchemy",
});
```

