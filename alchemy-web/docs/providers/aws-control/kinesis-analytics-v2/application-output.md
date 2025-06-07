---
title: Managing AWS KinesisAnalyticsV2 ApplicationOutputs with Alchemy
description: Learn how to create, update, and manage AWS KinesisAnalyticsV2 ApplicationOutputs using Alchemy Cloud Control.
---

# ApplicationOutput

The ApplicationOutput resource lets you create and manage [AWS KinesisAnalyticsV2 ApplicationOutputs](https://docs.aws.amazon.com/kinesisanalyticsv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationoutput.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const applicationoutput = await AWS.KinesisAnalyticsV2.ApplicationOutput(
  "applicationoutput-example",
  { ApplicationName: "applicationoutput-application", Output: "example-output" }
);
```

