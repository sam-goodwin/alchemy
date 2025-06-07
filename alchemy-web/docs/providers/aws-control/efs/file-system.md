---
title: Managing AWS EFS FileSystems with Alchemy
description: Learn how to create, update, and manage AWS EFS FileSystems using Alchemy Cloud Control.
---

# FileSystem

The FileSystem resource lets you create and manage [AWS EFS FileSystems](https://docs.aws.amazon.com/efs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-efs-filesystem.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const filesystem = await AWS.EFS.FileSystem("filesystem-example", {});
```

