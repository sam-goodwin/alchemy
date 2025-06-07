---
title: Managing AWS KinesisAnalytics ApplicationOutputs with Alchemy
description: Learn how to create, update, and manage AWS KinesisAnalytics ApplicationOutputs using Alchemy Cloud Control.
---

# ApplicationOutput

The ApplicationOutput resource lets you create and manage [AWS KinesisAnalytics ApplicationOutputs](https://docs.aws.amazon.com/kinesisanalytics/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalytics-applicationoutput.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const applicationoutput = await AWS.KinesisAnalytics.ApplicationOutput(
  "applicationoutput-example",
  { ApplicationName: "applicationoutput-application", Output: "example-output" }
);
```

