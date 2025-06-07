---
title: Managing AWS Backup RestoreTestingSelections with Alchemy
description: Learn how to create, update, and manage AWS Backup RestoreTestingSelections using Alchemy Cloud Control.
---

# RestoreTestingSelection

The RestoreTestingSelection resource lets you create and manage [AWS Backup RestoreTestingSelections](https://docs.aws.amazon.com/backup/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-backup-restoretestingselection.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const restoretestingselection = await AWS.Backup.RestoreTestingSelection(
  "restoretestingselection-example",
  {
    ProtectedResourceType: "example-protectedresourcetype",
    RestoreTestingSelectionName: "restoretestingselection-restoretestingselection",
    RestoreTestingPlanName: "restoretestingselection-restoretestingplan",
    IamRoleArn: "example-iamrolearn",
  }
);
```

