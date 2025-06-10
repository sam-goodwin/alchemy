---
title: LogAnomalyDetectionIntegration
description: Learn how to create, update, and manage AWS DevOpsGuru LogAnomalyDetectionIntegrations using Alchemy Cloud Control.
---


The LogAnomalyDetectionIntegration resource lets you manage [AWS DevOpsGuru LogAnomalyDetectionIntegrations](https://docs.aws.amazon.com/devopsguru/latest/userguide/) for anomaly detection in your log data.

## Minimal Example

Create a basic LogAnomalyDetectionIntegration with default settings.

```ts
import AWS from "alchemy/aws/control";

const logAnomalyIntegration = await AWS.DevOpsGuru.LogAnomalyDetectionIntegration("basicIntegration", {
  adopt: false
});
```

## Advanced Configuration

Configure an integration to adopt an existing resource if it already exists.

```ts
const advancedLogAnomalyIntegration = await AWS.DevOpsGuru.LogAnomalyDetectionIntegration("advancedIntegration", {
  adopt: true
});
```

## Use Case: Integration with Existing Resources

Create an integration while ensuring that it adopts existing log resources if applicable.

```ts
const existingResourceIntegration = await AWS.DevOpsGuru.LogAnomalyDetectionIntegration("existingResourceIntegration", {
  adopt: true
});
```

## Additional Information

You can manage various aspects of the LogAnomalyDetectionIntegration, such as its ARN, creation time, and last update time, by referencing the returned properties after creation. 

```ts
console.log("ARN:", existingResourceIntegration.Arn);
console.log("Creation Time:", existingResourceIntegration.CreationTime);
console.log("Last Update Time:", existingResourceIntegration.LastUpdateTime);
```
