---
title: Managing AWS CE AnomalySubscriptions with Alchemy
description: Learn how to create, update, and manage AWS CE AnomalySubscriptions using Alchemy Cloud Control.
---

# AnomalySubscription

The AnomalySubscription resource lets you create and manage [AWS CE AnomalySubscriptions](https://docs.aws.amazon.com/ce/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ce-anomalysubscription.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const anomalysubscription = await AWS.CE.AnomalySubscription("anomalysubscription-example", {
  MonitorArnList: ["example-monitorarnlist-1"],
  Frequency: "example-frequency",
  SubscriptionName: "anomalysubscription-subscription",
  Subscribers: [],
});
```

