---
title: Managing AWS CloudFormation WaitConditions with Alchemy
description: Learn how to create, update, and manage AWS CloudFormation WaitConditions using Alchemy Cloud Control.
---

# WaitCondition

The WaitCondition resource lets you create and manage [AWS CloudFormation WaitConditions](https://docs.aws.amazon.com/cloudformation/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-waitcondition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const waitcondition = await AWS.CloudFormation.WaitCondition("waitcondition-example", {});
```

