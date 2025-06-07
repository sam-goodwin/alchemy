---
title: Managing AWS B2BI Profiles with Alchemy
description: Learn how to create, update, and manage AWS B2BI Profiles using Alchemy Cloud Control.
---

# Profile

The Profile resource lets you create and manage [AWS B2BI Profiles](https://docs.aws.amazon.com/b2bi/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-b2bi-profile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const profile = await AWS.B2BI.Profile("profile-example", {
  Logging: "example-logging",
  BusinessName: "profile-business",
  Phone: "example-phone",
  Name: "profile-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a profile with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedProfile = await AWS.B2BI.Profile("advanced-profile", {
  Logging: "example-logging",
  BusinessName: "profile-business",
  Phone: "example-phone",
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

