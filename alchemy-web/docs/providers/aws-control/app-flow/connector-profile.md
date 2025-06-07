---
title: Managing AWS AppFlow ConnectorProfiles with Alchemy
description: Learn how to create, update, and manage AWS AppFlow ConnectorProfiles using Alchemy Cloud Control.
---

# ConnectorProfile

The ConnectorProfile resource lets you create and manage [AWS AppFlow ConnectorProfiles](https://docs.aws.amazon.com/appflow/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-connectorprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const connectorprofile = await AWS.AppFlow.ConnectorProfile("connectorprofile-example", {
  ConnectorProfileName: "connectorprofile-connectorprofile",
  ConnectorType: "example-connectortype",
  ConnectionMode: "example-connectionmode",
});
```

