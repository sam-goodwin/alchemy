---
title: Managing AWS EC2 SnapshotBlockPublicAccesss with Alchemy
description: Learn how to create, update, and manage AWS EC2 SnapshotBlockPublicAccesss using Alchemy Cloud Control.
---

# SnapshotBlockPublicAccess

The SnapshotBlockPublicAccess resource lets you create and manage [AWS EC2 SnapshotBlockPublicAccesss](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-snapshotblockpublicaccess.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const snapshotblockpublicaccess = await AWS.EC2.SnapshotBlockPublicAccess(
  "snapshotblockpublicaccess-example",
  { State: "example-state" }
);
```

