---
title: Managing AWS Deadline QueueEnvironments with Alchemy
description: Learn how to create, update, and manage AWS Deadline QueueEnvironments using Alchemy Cloud Control.
---

# QueueEnvironment

The QueueEnvironment resource lets you create and manage [AWS Deadline QueueEnvironments](https://docs.aws.amazon.com/deadline/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-deadline-queueenvironment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const queueenvironment = await AWS.Deadline.QueueEnvironment("queueenvironment-example", {
  Priority: 1,
  QueueId: "example-queueid",
  TemplateType: "example-templatetype",
  FarmId: "example-farmid",
  Template: "example-template",
});
```

