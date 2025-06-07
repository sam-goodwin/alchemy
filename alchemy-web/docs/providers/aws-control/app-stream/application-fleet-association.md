---
title: Managing AWS AppStream ApplicationFleetAssociations with Alchemy
description: Learn how to create, update, and manage AWS AppStream ApplicationFleetAssociations using Alchemy Cloud Control.
---

# ApplicationFleetAssociation

The ApplicationFleetAssociation resource lets you create and manage [AWS AppStream ApplicationFleetAssociations](https://docs.aws.amazon.com/appstream/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appstream-applicationfleetassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const applicationfleetassociation = await AWS.AppStream.ApplicationFleetAssociation(
  "applicationfleetassociation-example",
  { FleetName: "applicationfleetassociation-fleet", ApplicationArn: "example-applicationarn" }
);
```

