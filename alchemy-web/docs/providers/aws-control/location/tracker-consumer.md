---
title: Managing AWS Location TrackerConsumers with Alchemy
description: Learn how to create, update, and manage AWS Location TrackerConsumers using Alchemy Cloud Control.
---

# TrackerConsumer

The TrackerConsumer resource lets you create and manage [AWS Location TrackerConsumers](https://docs.aws.amazon.com/location/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-location-trackerconsumer.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const trackerconsumer = await AWS.Location.TrackerConsumer("trackerconsumer-example", {
  TrackerName: "trackerconsumer-tracker",
  ConsumerArn: "example-consumerarn",
});
```

