---
title: Managing AWS KinesisAnalyticsV2 ApplicationReferenceDataSources with Alchemy
description: Learn how to create, update, and manage AWS KinesisAnalyticsV2 ApplicationReferenceDataSources using Alchemy Cloud Control.
---

# ApplicationReferenceDataSource

The ApplicationReferenceDataSource resource lets you create and manage [AWS KinesisAnalyticsV2 ApplicationReferenceDataSources](https://docs.aws.amazon.com/kinesisanalyticsv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalyticsv2-applicationreferencedatasource.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const applicationreferencedatasource = await AWS.KinesisAnalyticsV2.ApplicationReferenceDataSource(
  "applicationreferencedatasource-example",
  {
    ApplicationName: "applicationreferencedatasource-application",
    ReferenceDataSource: "example-referencedatasource",
  }
);
```

