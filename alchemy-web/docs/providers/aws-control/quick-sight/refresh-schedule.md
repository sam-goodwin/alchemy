---
title: Managing AWS QuickSight RefreshSchedules with Alchemy
description: Learn how to create, update, and manage AWS QuickSight RefreshSchedules using Alchemy Cloud Control.
---

# RefreshSchedule

The RefreshSchedule resource lets you create and manage [AWS QuickSight RefreshSchedules](https://docs.aws.amazon.com/quicksight/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-quicksight-refreshschedule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const refreshschedule = await AWS.QuickSight.RefreshSchedule("refreshschedule-example", {});
```

