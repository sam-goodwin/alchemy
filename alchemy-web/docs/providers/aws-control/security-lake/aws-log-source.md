---
title: Managing AWS SecurityLake AwsLogSources with Alchemy
description: Learn how to create, update, and manage AWS SecurityLake AwsLogSources using Alchemy Cloud Control.
---

# AwsLogSource

The AwsLogSource resource lets you create and manage [AWS SecurityLake AwsLogSources](https://docs.aws.amazon.com/securitylake/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-securitylake-awslogsource.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const awslogsource = await AWS.SecurityLake.AwsLogSource("awslogsource-example", {
  SourceName: "awslogsource-source",
  SourceVersion: "example-sourceversion",
  DataLakeArn: "example-datalakearn",
});
```

