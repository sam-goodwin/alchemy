---
title: Managing AWS Deadline StorageProfiles with Alchemy
description: Learn how to create, update, and manage AWS Deadline StorageProfiles using Alchemy Cloud Control.
---

# StorageProfile

The StorageProfile resource lets you create and manage [AWS Deadline StorageProfiles](https://docs.aws.amazon.com/deadline/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-deadline-storageprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const storageprofile = await AWS.Deadline.StorageProfile("storageprofile-example", {
  DisplayName: "storageprofile-display",
  FarmId: "example-farmid",
  OsFamily: "example-osfamily",
});
```

