---
title: EventTrigger
description: Learn how to create, update, and manage AWS CustomerProfiles EventTriggers using Alchemy Cloud Control.
---


The EventTrigger resource allows you to manage [AWS CustomerProfiles EventTriggers](https://docs.aws.amazon.com/customerprofiles/latest/userguide/) that respond to specific events within the Amazon Customer Profiles service.

## Minimal Example

Create a basic EventTrigger with required properties and a couple of common optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicEventTrigger = await AWS.CustomerProfiles.EventTrigger("basicEventTrigger", {
  DomainName: "customer-domain",
  ObjectTypeName: "Customer",
  EventTriggerName: "CustomerUpdated",
  EventTriggerConditions: [
    {
      ConditionType: "EventType",
      ConditionValue: "Update"
    }
  ],
  EventTriggerLimits: {
    MaximumEventTriggers: 10,
    MaximumExecutionFrequency: "FiveMinutes"
  }
});
```

## Advanced Configuration

Configure an EventTrigger with additional conditions and tags for better organization.

```ts
const advancedEventTrigger = await AWS.CustomerProfiles.EventTrigger("advancedEventTrigger", {
  DomainName: "customer-domain",
  ObjectTypeName: "Customer",
  EventTriggerName: "CustomerCreated",
  EventTriggerConditions: [
    {
      ConditionType: "EventType",
      ConditionValue: "Create"
    },
    {
      ConditionType: "SegmentFilter",
      ConditionValue: "NewCustomerSegment"
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Team",
      Value: "CustomerSuccess"
    }
  ]
});
```

## Using Segment Filters

Create an EventTrigger that filters specific segments for targeted events.

```ts
const segmentFilteredEventTrigger = await AWS.CustomerProfiles.EventTrigger("segmentFilteredEventTrigger", {
  DomainName: "customer-domain",
  ObjectTypeName: "Customer",
  EventTriggerName: "CustomerSegmentTriggered",
  SegmentFilter: "ActiveCustomers",
  EventTriggerConditions: [
    {
      ConditionType: "EventType",
      ConditionValue: "Update"
    }
  ]
});
```
