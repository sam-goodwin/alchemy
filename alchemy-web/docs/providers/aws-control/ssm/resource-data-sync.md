---
title: Managing AWS SSM ResourceDataSyncs with Alchemy
description: Learn how to create, update, and manage AWS SSM ResourceDataSyncs using Alchemy Cloud Control.
---

# ResourceDataSync

The ResourceDataSync resource lets you create and manage [AWS SSM ResourceDataSyncs](https://docs.aws.amazon.com/ssm/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ssm-resourcedatasync.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const resourcedatasync = await AWS.SSM.ResourceDataSync("resourcedatasync-example", {
  SyncName: "resourcedatasync-sync",
});
```

