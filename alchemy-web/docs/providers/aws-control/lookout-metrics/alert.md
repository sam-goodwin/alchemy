---
title: Managing AWS LookoutMetrics Alerts with Alchemy
description: Learn how to create, update, and manage AWS LookoutMetrics Alerts using Alchemy Cloud Control.
---

# Alert

The Alert resource lets you create and manage [AWS LookoutMetrics Alerts](https://docs.aws.amazon.com/lookoutmetrics/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lookoutmetrics-alert.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const alert = await AWS.LookoutMetrics.Alert("alert-example", {
  Action: "example-action",
  AlertSensitivityThreshold: 1,
  AnomalyDetectorArn: "example-anomalydetectorarn",
});
```

