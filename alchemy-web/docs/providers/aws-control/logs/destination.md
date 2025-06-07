---
title: Managing AWS Logs Destinations with Alchemy
description: Learn how to create, update, and manage AWS Logs Destinations using Alchemy Cloud Control.
---

# Destination

The Destination resource lets you create and manage [AWS Logs Destinations](https://docs.aws.amazon.com/logs/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-destination.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const destination = await AWS.Logs.Destination("destination-example", {
  DestinationName: "destination-destination",
  TargetArn: "example-targetarn",
  RoleArn: "example-rolearn",
});
```

