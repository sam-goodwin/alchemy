---
title: Managing AWS DevOpsGuru LogAnomalyDetectionIntegrations with Alchemy
description: Learn how to create, update, and manage AWS DevOpsGuru LogAnomalyDetectionIntegrations using Alchemy Cloud Control.
---

# LogAnomalyDetectionIntegration

The LogAnomalyDetectionIntegration resource lets you create and manage [AWS DevOpsGuru LogAnomalyDetectionIntegrations](https://docs.aws.amazon.com/devopsguru/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-devopsguru-loganomalydetectionintegration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const loganomalydetectionintegration = await AWS.DevOpsGuru.LogAnomalyDetectionIntegration(
  "loganomalydetectionintegration-example",
  {}
);
```

