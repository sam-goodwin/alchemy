---
title: Managing AWS PCAConnectorAD ServicePrincipalNames with Alchemy
description: Learn how to create, update, and manage AWS PCAConnectorAD ServicePrincipalNames using Alchemy Cloud Control.
---

# ServicePrincipalName

The ServicePrincipalName resource lets you create and manage [AWS PCAConnectorAD ServicePrincipalNames](https://docs.aws.amazon.com/pcaconnectorad/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-pcaconnectorad-serviceprincipalname.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const serviceprincipalname = await AWS.PCAConnectorAD.ServicePrincipalName(
  "serviceprincipalname-example",
  {}
);
```

