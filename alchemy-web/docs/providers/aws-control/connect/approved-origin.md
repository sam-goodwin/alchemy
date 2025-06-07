---
title: Managing AWS Connect ApprovedOrigins with Alchemy
description: Learn how to create, update, and manage AWS Connect ApprovedOrigins using Alchemy Cloud Control.
---

# ApprovedOrigin

The ApprovedOrigin resource lets you create and manage [AWS Connect ApprovedOrigins](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-approvedorigin.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const approvedorigin = await AWS.Connect.ApprovedOrigin("approvedorigin-example", {
  Origin: "example-origin",
  InstanceId: "example-instanceid",
});
```

