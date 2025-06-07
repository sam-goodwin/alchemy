---
title: Managing AWS ServiceCatalog ServiceActionAssociations with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalog ServiceActionAssociations using Alchemy Cloud Control.
---

# ServiceActionAssociation

The ServiceActionAssociation resource lets you create and manage [AWS ServiceCatalog ServiceActionAssociations](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-servicecatalog-serviceactionassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const serviceactionassociation = await AWS.ServiceCatalog.ServiceActionAssociation(
  "serviceactionassociation-example",
  {
    ServiceActionId: "example-serviceactionid",
    ProductId: "example-productid",
    ProvisioningArtifactId: "example-provisioningartifactid",
  }
);
```

