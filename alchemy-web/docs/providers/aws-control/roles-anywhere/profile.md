---
title: Managing AWS RolesAnywhere Profiles with Alchemy
description: Learn how to create, update, and manage AWS RolesAnywhere Profiles using Alchemy Cloud Control.
---

# Profile

The Profile resource lets you create and manage [AWS RolesAnywhere Profiles](https://docs.aws.amazon.com/rolesanywhere/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rolesanywhere-profile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const profile = await AWS.RolesAnywhere.Profile("profile-example", {
  RoleArns: ["example-rolearns-1"],
  Name: "profile-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a profile with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedProfile = await AWS.RolesAnywhere.Profile("advanced-profile", {
  RoleArns: ["example-rolearns-1"],
  Name: "profile-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

