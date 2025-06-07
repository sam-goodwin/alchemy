---
title: Managing AWS DataZone EnvironmentProfiles with Alchemy
description: Learn how to create, update, and manage AWS DataZone EnvironmentProfiles using Alchemy Cloud Control.
---

# EnvironmentProfile

The EnvironmentProfile resource lets you create and manage [AWS DataZone EnvironmentProfiles](https://docs.aws.amazon.com/datazone/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datazone-environmentprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const environmentprofile = await AWS.DataZone.EnvironmentProfile("environmentprofile-example", {
  ProjectIdentifier: "example-projectidentifier",
  AwsAccountRegion: "example-awsaccountregion",
  AwsAccountId: "example-awsaccountid",
  EnvironmentBlueprintIdentifier: "example-environmentblueprintidentifier",
  Name: "environmentprofile-",
  DomainIdentifier: "example-domainidentifier",
  Description: "A environmentprofile resource managed by Alchemy",
});
```

## Advanced Configuration

Create a environmentprofile with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEnvironmentProfile = await AWS.DataZone.EnvironmentProfile(
  "advanced-environmentprofile",
  {
    ProjectIdentifier: "example-projectidentifier",
    AwsAccountRegion: "example-awsaccountregion",
    AwsAccountId: "example-awsaccountid",
    EnvironmentBlueprintIdentifier: "example-environmentblueprintidentifier",
    Name: "environmentprofile-",
    DomainIdentifier: "example-domainidentifier",
    Description: "A environmentprofile resource managed by Alchemy",
  }
);
```

