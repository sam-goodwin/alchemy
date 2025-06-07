---
title: Managing AWS KinesisAnalytics Applications with Alchemy
description: Learn how to create, update, and manage AWS KinesisAnalytics Applications using Alchemy Cloud Control.
---

# Application

The Application resource lets you create and manage [AWS KinesisAnalytics Applications](https://docs.aws.amazon.com/kinesisanalytics/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalytics-application.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const application = await AWS.KinesisAnalytics.Application("application-example", { Inputs: [] });
```

