---
title: Managing AWS Backup ReportPlans with Alchemy
description: Learn how to create, update, and manage AWS Backup ReportPlans using Alchemy Cloud Control.
---

# ReportPlan

The ReportPlan resource lets you create and manage [AWS Backup ReportPlans](https://docs.aws.amazon.com/backup/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-backup-reportplan.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const reportplan = await AWS.Backup.ReportPlan("reportplan-example", {
  ReportSetting: "example-reportsetting",
  ReportDeliveryChannel: "example-reportdeliverychannel",
});
```

