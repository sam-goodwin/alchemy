---
title: Managing AWS Connect UserHierarchyStructures with Alchemy
description: Learn how to create, update, and manage AWS Connect UserHierarchyStructures using Alchemy Cloud Control.
---

# UserHierarchyStructure

The UserHierarchyStructure resource lets you create and manage [AWS Connect UserHierarchyStructures](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-userhierarchystructure.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const userhierarchystructure = await AWS.Connect.UserHierarchyStructure(
  "userhierarchystructure-example",
  { InstanceArn: "example-instancearn" }
);
```

