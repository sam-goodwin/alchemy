---
title: Managing AWS ServiceCatalog ServiceActions with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalog ServiceActions using Alchemy Cloud Control.
---

# ServiceAction

The ServiceAction resource lets you create and manage [AWS ServiceCatalog ServiceActions](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalog-serviceaction.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const serviceaction = await AWS.ServiceCatalog.ServiceAction("serviceaction-example", {
  Definition: [],
  DefinitionType: "example-definitiontype",
  Name: "serviceaction-",
  Description: "A serviceaction resource managed by Alchemy",
});
```

## Advanced Configuration

Create a serviceaction with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedServiceAction = await AWS.ServiceCatalog.ServiceAction("advanced-serviceaction", {
  Definition: [],
  DefinitionType: "example-definitiontype",
  Name: "serviceaction-",
  Description: "A serviceaction resource managed by Alchemy",
});
```

