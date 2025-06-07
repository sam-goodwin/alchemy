---
title: Managing AWS IoTThingsGraph FlowTemplates with Alchemy
description: Learn how to create, update, and manage AWS IoTThingsGraph FlowTemplates using Alchemy Cloud Control.
---

# FlowTemplate

The FlowTemplate resource lets you create and manage [AWS IoTThingsGraph FlowTemplates](https://docs.aws.amazon.com/iotthingsgraph/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotthingsgraph-flowtemplate.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const flowtemplate = await AWS.IoTThingsGraph.FlowTemplate("flowtemplate-example", {
  Definition: "example-definition",
});
```

