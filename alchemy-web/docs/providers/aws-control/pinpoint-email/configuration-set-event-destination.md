---
title: Managing AWS PinpointEmail ConfigurationSetEventDestinations with Alchemy
description: Learn how to create, update, and manage AWS PinpointEmail ConfigurationSetEventDestinations using Alchemy Cloud Control.
---

# ConfigurationSetEventDestination

The ConfigurationSetEventDestination resource lets you create and manage [AWS PinpointEmail ConfigurationSetEventDestinations](https://docs.aws.amazon.com/pinpointemail/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pinpointemail-configurationseteventdestination.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const configurationseteventdestination = await AWS.PinpointEmail.ConfigurationSetEventDestination(
  "configurationseteventdestination-example",
  {
    EventDestinationName: "configurationseteventdestination-eventdestination",
    ConfigurationSetName: "configurationseteventdestination-configurationset",
  }
);
```

