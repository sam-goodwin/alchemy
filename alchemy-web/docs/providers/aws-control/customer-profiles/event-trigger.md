---
title: Managing AWS CustomerProfiles EventTriggers with Alchemy
description: Learn how to create, update, and manage AWS CustomerProfiles EventTriggers using Alchemy Cloud Control.
---

# EventTrigger

The EventTrigger resource lets you create and manage [AWS CustomerProfiles EventTriggers](https://docs.aws.amazon.com/customerprofiles/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-customerprofiles-eventtrigger.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const eventtrigger = await AWS.CustomerProfiles.EventTrigger("eventtrigger-example", {
  DomainName: "eventtrigger-domain",
  ObjectTypeName: "eventtrigger-objecttype",
  EventTriggerConditions: [],
  EventTriggerName: "eventtrigger-eventtrigger",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A eventtrigger resource managed by Alchemy",
});
```

## Advanced Configuration

Create a eventtrigger with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEventTrigger = await AWS.CustomerProfiles.EventTrigger("advanced-eventtrigger", {
  DomainName: "eventtrigger-domain",
  ObjectTypeName: "eventtrigger-objecttype",
  EventTriggerConditions: [],
  EventTriggerName: "eventtrigger-eventtrigger",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A eventtrigger resource managed by Alchemy",
});
```

