---
title: Managing AWS AppConfig ConfigurationProfiles with Alchemy
description: Learn how to create, update, and manage AWS AppConfig ConfigurationProfiles using Alchemy Cloud Control.
---

# ConfigurationProfile

The ConfigurationProfile resource lets you create and manage [AWS AppConfig ConfigurationProfiles](https://docs.aws.amazon.com/appconfig/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appconfig-configurationprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const configurationprofile = await AWS.AppConfig.ConfigurationProfile(
  "configurationprofile-example",
  {
    LocationUri: "example-locationuri",
    ApplicationId: "example-applicationid",
    Name: "configurationprofile-",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A configurationprofile resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a configurationprofile with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConfigurationProfile = await AWS.AppConfig.ConfigurationProfile(
  "advanced-configurationprofile",
  {
    LocationUri: "example-locationuri",
    ApplicationId: "example-applicationid",
    Name: "configurationprofile-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A configurationprofile resource managed by Alchemy",
  }
);
```

