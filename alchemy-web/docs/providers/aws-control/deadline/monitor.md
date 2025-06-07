---
title: Managing AWS Deadline Monitors with Alchemy
description: Learn how to create, update, and manage AWS Deadline Monitors using Alchemy Cloud Control.
---

# Monitor

The Monitor resource lets you create and manage [AWS Deadline Monitors](https://docs.aws.amazon.com/deadline/latest/userguide/) that assist in monitoring the status of tasks and jobs within your AWS Deadline infrastructure.

## Minimal Example

This example demonstrates how to create a basic Deadline Monitor with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicMonitor = await AWS.Deadline.Monitor("BasicMonitor", {
  IdentityCenterInstanceArn: "arn:aws:identitystore:us-west-2:123456789012:instance/abcdefg-1234-5678-abcd-ef1234567890",
  Subdomain: "mydeadline",
  DisplayName: "My Deadline Monitor",
  RoleArn: "arn:aws:iam::123456789012:role/DeadlineMonitorRole"
});
```

## Enhanced Configuration

This example shows how to create a Deadline Monitor with additional properties such as adopting an existing resource.

```ts
const enhancedMonitor = await AWS.Deadline.Monitor("EnhancedMonitor", {
  IdentityCenterInstanceArn: "arn:aws:identitystore:us-west-2:123456789012:instance/abcdefg-1234-5678-abcd-ef1234567890",
  Subdomain: "enhanceddeadline",
  DisplayName: "Enhanced Deadline Monitor",
  RoleArn: "arn:aws:iam::123456789012:role/DeadlineMonitorRole",
  adopt: true
});
```

## Monitoring Multiple Instances

This example illustrates how to create multiple Deadline Monitors for different environments.

```ts
const productionMonitor = await AWS.Deadline.Monitor("ProdMonitor", {
  IdentityCenterInstanceArn: "arn:aws:identitystore:us-west-2:123456789012:instance/abcdefg-1234-5678-abcd-ef1234567890",
  Subdomain: "prod-deadline",
  DisplayName: "Production Deadline Monitor",
  RoleArn: "arn:aws:iam::123456789012:role/DeadlineMonitorRole"
});

const developmentMonitor = await AWS.Deadline.Monitor("DevMonitor", {
  IdentityCenterInstanceArn: "arn:aws:identitystore:us-west-2:123456789012:instance/abcdefg-1234-5678-abcd-ef1234567890",
  Subdomain: "dev-deadline",
  DisplayName: "Development Deadline Monitor",
  RoleArn: "arn:aws:iam::123456789012:role/DeadlineMonitorRole",
  adopt: true
});
```