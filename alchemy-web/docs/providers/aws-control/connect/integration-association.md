---
title: Managing AWS Connect IntegrationAssociations with Alchemy
description: Learn how to create, update, and manage AWS Connect IntegrationAssociations using Alchemy Cloud Control.
---

# IntegrationAssociation

The IntegrationAssociation resource lets you create and manage [AWS Connect IntegrationAssociations](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-integrationassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const integrationassociation = await AWS.Connect.IntegrationAssociation(
  "integrationassociation-example",
  {
    IntegrationArn: "example-integrationarn",
    InstanceId: "example-instanceid",
    IntegrationType: "example-integrationtype",
  }
);
```

