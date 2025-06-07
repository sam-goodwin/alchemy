---
title: Managing AWS Logs Integrations with Alchemy
description: Learn how to create, update, and manage AWS Logs Integrations using Alchemy Cloud Control.
---

# Integration

The Integration resource lets you create and manage [AWS Logs Integrations](https://docs.aws.amazon.com/logs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-integration.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const integration = await AWS.Logs.Integration("integration-example", {
  IntegrationName: "integration-integration",
  ResourceConfig: "example-resourceconfig",
  IntegrationType: "example-integrationtype",
});
```

