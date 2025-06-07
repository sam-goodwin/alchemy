---
title: Managing AWS Backup Frameworks with Alchemy
description: Learn how to create, update, and manage AWS Backup Frameworks using Alchemy Cloud Control.
---

# Framework

The Framework resource lets you create and manage [AWS Backup Frameworks](https://docs.aws.amazon.com/backup/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-backup-framework.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const framework = await AWS.Backup.Framework("framework-example", { FrameworkControls: [] });
```

