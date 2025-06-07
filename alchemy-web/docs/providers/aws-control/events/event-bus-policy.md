---
title: Managing AWS Events EventBusPolicys with Alchemy
description: Learn how to create, update, and manage AWS Events EventBusPolicys using Alchemy Cloud Control.
---

# EventBusPolicy

The EventBusPolicy resource lets you create and manage [AWS Events EventBusPolicys](https://docs.aws.amazon.com/events/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-eventbuspolicy.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const eventbuspolicy = await AWS.Events.EventBusPolicy("eventbuspolicy-example", {
  StatementId: "example-statementid",
});
```

