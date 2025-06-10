---
title: Monitor
description: Learn how to create, update, and manage AWS Deadline Monitors using Alchemy Cloud Control.
---


The Monitor resource lets you create and manage [AWS Deadline Monitors](https://docs.aws.amazon.com/deadline/latest/userguide/) for tracking and managing deadlines within your AWS environment.

## Minimal Example

Create a basic Deadline Monitor with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const deadlineMonitor = await AWS.Deadline.Monitor("basicMonitor", {
  IdentityCenterInstanceArn: "arn:aws:identitystore:us-west-2:123456789012:instance/abcd1234-56ef-78gh-90ij-klmn12345678",
  Subdomain: "my-deadline-monitor",
  DisplayName: "My Deadline Monitor",
  RoleArn: "arn:aws:iam::123456789012:role/DeadlineMonitorRole",
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a Deadline Monitor with additional options for a more customized setup.

```ts
const advancedDeadlineMonitor = await AWS.Deadline.Monitor("advancedMonitor", {
  IdentityCenterInstanceArn: "arn:aws:identitystore:us-west-2:123456789012:instance/abcd1234-56ef-78gh-90ij-klmn12345678",
  Subdomain: "advanced-deadline-monitor",
  DisplayName: "Advanced Deadline Monitor",
  RoleArn: "arn:aws:iam::123456789012:role/AdvancedDeadlineMonitorRole",
  adopt: false // Do not adopt existing resource
});
```

## Monitoring Configuration

Set up a Deadline Monitor specifically to track project deadlines with additional monitoring features.

```ts
const projectDeadlineMonitor = await AWS.Deadline.Monitor("projectMonitor", {
  IdentityCenterInstanceArn: "arn:aws:identitystore:us-west-2:123456789012:instance/abcd1234-56ef-78gh-90ij-klmn12345678",
  Subdomain: "project-deadline-monitor",
  DisplayName: "Project Deadline Monitor",
  RoleArn: "arn:aws:iam::123456789012:role/ProjectDeadlineMonitorRole",
  adopt: true // Adopt existing resource if it already exists
});
```
