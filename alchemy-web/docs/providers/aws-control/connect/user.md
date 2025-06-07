---
title: Managing AWS Connect Users with Alchemy
description: Learn how to create, update, and manage AWS Connect Users using Alchemy Cloud Control.
---

# User

The User resource lets you create and manage [AWS Connect Users](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-user.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const user = await AWS.Connect.User("user-example", {
  RoutingProfileArn: "example-routingprofilearn",
  Username: "user-user",
  PhoneConfig: "example-phoneconfig",
  InstanceArn: "example-instancearn",
  SecurityProfileArns: ["example-securityprofilearns-1"],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a user with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedUser = await AWS.Connect.User("advanced-user", {
  RoutingProfileArn: "example-routingprofilearn",
  Username: "user-user",
  PhoneConfig: "example-phoneconfig",
  InstanceArn: "example-instancearn",
  SecurityProfileArns: ["example-securityprofilearns-1"],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

