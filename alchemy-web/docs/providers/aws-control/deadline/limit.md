---
title: Managing AWS Deadline Limits with Alchemy
description: Learn how to create, update, and manage AWS Deadline Limits using Alchemy Cloud Control.
---

# Limit

The Limit resource lets you create and manage [AWS Deadline Limits](https://docs.aws.amazon.com/deadline/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-deadline-limit.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const limit = await AWS.Deadline.Limit("limit-example", {
  AmountRequirementName: "limit-amountrequirement",
  DisplayName: "limit-display",
  MaxCount: 1,
  FarmId: "example-farmid",
  Description: "A limit resource managed by Alchemy",
});
```

## Advanced Configuration

Create a limit with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLimit = await AWS.Deadline.Limit("advanced-limit", {
  AmountRequirementName: "limit-amountrequirement",
  DisplayName: "limit-display",
  MaxCount: 1,
  FarmId: "example-farmid",
  Description: "A limit resource managed by Alchemy",
});
```

