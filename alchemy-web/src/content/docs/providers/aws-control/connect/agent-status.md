---
title: AgentStatus
description: Learn how to create, update, and manage AWS Connect AgentStatuss using Alchemy Cloud Control.
---


The AgentStatus resource lets you manage [AWS Connect AgentStatuss](https://docs.aws.amazon.com/connect/latest/userguide/) which define the status of agents in Amazon Connect.

## Minimal Example

Create a basic AgentStatus with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const agentStatus = await AWS.Connect.AgentStatus("available-status", {
  name: "Available",
  state: "ACTIVE",
  instanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-efgh-5678-ijkl-90mnopqrstuv",
  resetOrderNumber: true
});
```

## Advanced Configuration

Configure an AgentStatus with additional properties like description and display order.

```ts
const busyStatus = await AWS.Connect.AgentStatus("busy-status", {
  name: "Busy",
  state: "ACTIVE",
  instanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-efgh-5678-ijkl-90mnopqrstuv",
  description: "Agent is currently busy.",
  displayOrder: 1,
  resetOrderNumber: false
});
```

## Custom Status with Tags

Create an AgentStatus with tags for better resource management.

```ts
const onLeaveStatus = await AWS.Connect.AgentStatus("on-leave-status", {
  name: "On Leave",
  state: "INACTIVE",
  instanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-efgh-5678-ijkl-90mnopqrstuv",
  tags: [
    {
      key: "Department",
      value: "Human Resources"
    },
    {
      key: "Status",
      value: "Leave"
    }
  ]
});
```

## Status with Display Order

Define an AgentStatus with a specific display order to control the order in which statuses appear.

```ts
const offlineStatus = await AWS.Connect.AgentStatus("offline-status", {
  name: "Offline",
  state: "INACTIVE",
  instanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcd1234-efgh-5678-ijkl-90mnopqrstuv",
  displayOrder: 5,
  resetOrderNumber: true
});
```
