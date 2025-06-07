---
title: Managing AWS SES ConfigurationSetEventDestinations with Alchemy
description: Learn how to create, update, and manage AWS SES ConfigurationSetEventDestinations using Alchemy Cloud Control.
---

# ConfigurationSetEventDestination

The ConfigurationSetEventDestination resource lets you create and manage [AWS SES ConfigurationSetEventDestinations](https://docs.aws.amazon.com/ses/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-configurationseteventdestination.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const configurationseteventdestination = await AWS.SES.ConfigurationSetEventDestination(
  "configurationseteventdestination-example",
  {
    ConfigurationSetName: "configurationseteventdestination-configurationset",
    EventDestination: "example-eventdestination",
  }
);
```

