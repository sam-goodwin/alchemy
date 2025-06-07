---
title: Managing AWS KinesisAnalytics ApplicationReferenceDataSources with Alchemy
description: Learn how to create, update, and manage AWS KinesisAnalytics ApplicationReferenceDataSources using Alchemy Cloud Control.
---

# ApplicationReferenceDataSource

The ApplicationReferenceDataSource resource lets you create and manage [AWS KinesisAnalytics ApplicationReferenceDataSources](https://docs.aws.amazon.com/kinesisanalytics/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kinesisanalytics-applicationreferencedatasource.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const applicationreferencedatasource = await AWS.KinesisAnalytics.ApplicationReferenceDataSource(
  "applicationreferencedatasource-example",
  {
    ApplicationName: "applicationreferencedatasource-application",
    ReferenceDataSource: "example-referencedatasource",
  }
);
```

