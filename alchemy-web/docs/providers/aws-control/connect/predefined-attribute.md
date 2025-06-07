---
title: Managing AWS Connect PredefinedAttributes with Alchemy
description: Learn how to create, update, and manage AWS Connect PredefinedAttributes using Alchemy Cloud Control.
---

# PredefinedAttribute

The PredefinedAttribute resource lets you create and manage [AWS Connect PredefinedAttributes](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-predefinedattribute.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const predefinedattribute = await AWS.Connect.PredefinedAttribute("predefinedattribute-example", {
  InstanceArn: "example-instancearn",
  Values: "example-values",
  Name: "predefinedattribute-",
});
```

