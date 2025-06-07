---
title: Managing AWS DataZone GroupProfiles with Alchemy
description: Learn how to create, update, and manage AWS DataZone GroupProfiles using Alchemy Cloud Control.
---

# GroupProfile

The GroupProfile resource lets you create and manage [AWS DataZone GroupProfiles](https://docs.aws.amazon.com/datazone/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datazone-groupprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const groupprofile = await AWS.DataZone.GroupProfile("groupprofile-example", {
  DomainIdentifier: "example-domainidentifier",
  GroupIdentifier: "example-groupidentifier",
});
```

