---
title: Managing AWS Deadline QueueLimitAssociations with Alchemy
description: Learn how to create, update, and manage AWS Deadline QueueLimitAssociations using Alchemy Cloud Control.
---

# QueueLimitAssociation

The QueueLimitAssociation resource lets you create and manage [AWS Deadline QueueLimitAssociations](https://docs.aws.amazon.com/deadline/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-deadline-queuelimitassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const queuelimitassociation = await AWS.Deadline.QueueLimitAssociation(
  "queuelimitassociation-example",
  { LimitId: "example-limitid", QueueId: "example-queueid", FarmId: "example-farmid" }
);
```

