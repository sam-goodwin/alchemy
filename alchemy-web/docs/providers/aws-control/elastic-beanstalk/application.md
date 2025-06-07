---
title: Managing AWS ElasticBeanstalk Applications with Alchemy
description: Learn how to create, update, and manage AWS ElasticBeanstalk Applications using Alchemy Cloud Control.
---

# Application

The Application resource lets you create and manage [AWS ElasticBeanstalk Applications](https://docs.aws.amazon.com/elasticbeanstalk/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticbeanstalk-application.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const application = await AWS.ElasticBeanstalk.Application("application-example", {
  Description: "A application resource managed by Alchemy",
});
```

## Advanced Configuration

Create a application with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApplication = await AWS.ElasticBeanstalk.Application("advanced-application", {
  Description: "A application resource managed by Alchemy",
});
```

