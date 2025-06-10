---
title: RoutingProfile
description: Learn how to create, update, and manage AWS Connect RoutingProfiles using Alchemy Cloud Control.
---


The RoutingProfile resource allows you to manage [AWS Connect RoutingProfiles](https://docs.aws.amazon.com/connect/latest/userguide/) which define how agents within your AWS Connect instance interact with incoming communications.

## Minimal Example

Create a basic RoutingProfile with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicRoutingProfile = await AWS.Connect.RoutingProfile("basicRoutingProfile", {
  name: "Basic Routing Profile",
  description: "A simple routing profile for basic call handling.",
  mediaConcurrencies: [
    { channel: "VOICE", concurrency: 5 },
    { channel: "CHAT", concurrency: 2 }
  ],
  instanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcde12345",
  defaultOutboundQueueArn: "arn:aws:connect:us-east-1:123456789012:queue/xyz987654",
  agentAvailabilityTimer: "PT15M"
});
```

## Advanced Configuration

Configure a RoutingProfile with additional queue configurations and tags for better management.

```ts
const advancedRoutingProfile = await AWS.Connect.RoutingProfile("advancedRoutingProfile", {
  name: "Advanced Routing Profile",
  description: "An advanced routing profile with multiple queues.",
  mediaConcurrencies: [
    { channel: "VOICE", concurrency: 10 },
    { channel: "CHAT", concurrency: 5 }
  ],
  instanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcde12345",
  defaultOutboundQueueArn: "arn:aws:connect:us-east-1:123456789012:queue/xyz987654",
  queueConfigs: [
    {
      queueArn: "arn:aws:connect:us-east-1:123456789012:queue/queue1",
      priority: 1,
      delay: 0
    },
    {
      queueArn: "arn:aws:connect:us-east-1:123456789012:queue/queue2",
      priority: 2,
      delay: 5
    }
  ],
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Department", value: "Support" }
  ]
});
```

## Using Tags for Resource Management

Demonstrate how to create a RoutingProfile with tags for better organization and resource management.

```ts
const taggedRoutingProfile = await AWS.Connect.RoutingProfile("taggedRoutingProfile", {
  name: "Tagged Routing Profile",
  description: "A routing profile with custom tags for organization.",
  mediaConcurrencies: [
    { channel: "VOICE", concurrency: 4 },
    { channel: "CHAT", concurrency: 3 }
  ],
  instanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcde12345",
  defaultOutboundQueueArn: "arn:aws:connect:us-east-1:123456789012:queue/xyz987654",
  tags: [
    { key: "Project", value: "Customer Support" },
    { key: "Owner", value: "John Doe" }
  ]
});
```
