---
title: Workspace
description: Learn how to create, update, and manage AWS APS Workspaces using Alchemy Cloud Control.
---


The Workspace resource lets you manage [AWS APS Workspaces](https://docs.aws.amazon.com/aps/latest/userguide/) for your applications, providing an environment for your analytical workloads.

## Minimal Example

Create a basic APS Workspace with essential properties.

```ts
import AWS from "alchemy/aws/control";

const apsWorkspace = await AWS.APS.Workspace("myApsWorkspace", {
  Alias: "my-workspace-alias",
  KmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "DataAnalytics" }
  ]
});
```

## Advanced Configuration

Configure a workspace with logging and alert manager definitions for enhanced monitoring.

```ts
import AWS from "alchemy/aws/control";

const advancedApsWorkspace = await AWS.APS.Workspace("advancedApsWorkspace", {
  Alias: "advanced-workspace",
  KmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/wxyz1234-5678-90ef-ghij-klmnopqrstuv",
  LoggingConfiguration: {
    LogGroupName: "aps-workspace-logs",
    LogStreamName: "workspace-log-stream"
  },
  AlertManagerDefinition: JSON.stringify({
    route: {
      group_by: ["alertname"],
      group_wait: "30s",
      group_interval: "5m",
      repeat_interval: "3h",
      routes: [
        {
          receiver: "email",
          match: { severity: "critical" }
        }
      ]
    },
    receivers: [
      {
        name: "email",
        email_configs: [
          {
            to: "alerts@example.com",
            from: "no-reply@example.com",
            smarthost: "smtp.example.com:587",
            auth_username: "smtp_user",
            auth_password: "smtp_password"
          }
        ]
      }
    ]
  }),
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "AdvancedAnalytics" }
  ]
});
```

## Custom Workspace Configuration

Set up a workspace with specific configurations tailored to application needs.

```ts
import AWS from "alchemy/aws/control";

const customWorkspace = await AWS.APS.Workspace("customApsWorkspace", {
  Alias: "custom-workspace",
  KmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/ijkl1234-5678-90ef-ghij-klmnopqrstuv",
  WorkspaceConfiguration: {
    retentionPeriod: "30d",
    maxDiskSize: "100GB"
  },
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Project", Value: "CustomAnalytics" }
  ]
});
```
