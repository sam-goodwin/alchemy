---
title: Managing AWS DataZone ProjectProfiles with Alchemy
description: Learn how to create, update, and manage AWS DataZone ProjectProfiles using Alchemy Cloud Control.
---

# ProjectProfile

The ProjectProfile resource lets you create and manage [AWS DataZone ProjectProfiles](https://docs.aws.amazon.com/datazone/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datazone-projectprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const projectprofile = await AWS.DataZone.ProjectProfile("projectprofile-example", {
  Name: "projectprofile-",
  Description: "A projectprofile resource managed by Alchemy",
});
```

## Advanced Configuration

Create a projectprofile with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedProjectProfile = await AWS.DataZone.ProjectProfile("advanced-projectprofile", {
  Name: "projectprofile-",
  Description: "A projectprofile resource managed by Alchemy",
});
```

