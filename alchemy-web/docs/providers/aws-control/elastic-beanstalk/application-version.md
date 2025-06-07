---
title: Managing AWS ElasticBeanstalk ApplicationVersions with Alchemy
description: Learn how to create, update, and manage AWS ElasticBeanstalk ApplicationVersions using Alchemy Cloud Control.
---

# ApplicationVersion

The ApplicationVersion resource lets you create and manage [AWS ElasticBeanstalk ApplicationVersions](https://docs.aws.amazon.com/elasticbeanstalk/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticbeanstalk-applicationversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const applicationversion = await AWS.ElasticBeanstalk.ApplicationVersion(
  "applicationversion-example",
  {
    ApplicationName: "applicationversion-application",
    SourceBundle: "example-sourcebundle",
    Description: "A applicationversion resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a applicationversion with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApplicationVersion = await AWS.ElasticBeanstalk.ApplicationVersion(
  "advanced-applicationversion",
  {
    ApplicationName: "applicationversion-application",
    SourceBundle: "example-sourcebundle",
    Description: "A applicationversion resource managed by Alchemy",
  }
);
```

