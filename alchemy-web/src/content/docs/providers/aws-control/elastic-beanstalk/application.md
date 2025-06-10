---
title: Application
description: Learn how to create, update, and manage AWS ElasticBeanstalk Applications using Alchemy Cloud Control.
---


The Application resource lets you manage [AWS ElasticBeanstalk Applications](https://docs.aws.amazon.com/elasticbeanstalk/latest/userguide/) and their associated settings and configurations.

## Minimal Example

Create a basic ElasticBeanstalk application with a name and description.

```ts
import AWS from "alchemy/aws/control";

const myApplication = await AWS.ElasticBeanstalk.Application("myApplication", {
  ApplicationName: "MyWebApp",
  Description: "This is my web application running on Elastic Beanstalk."
});
```

## Advanced Configuration

Configure an ElasticBeanstalk application with resource lifecycle settings for better management.

```ts
import AWS from "alchemy/aws/control";

const lifecycleConfig = {
  ServiceRole: "arn:aws:iam::123456789012:role/elasticbeanstalk-service-role",
  VersionLifecycleConfig: {
    MaxCount: 10,
    MaxAge: 30
  }
};

const advancedApplication = await AWS.ElasticBeanstalk.Application("advancedApplication", {
  ApplicationName: "AdvancedWebApp",
  Description: "This application includes advanced lifecycle configurations.",
  ResourceLifecycleConfig: lifecycleConfig
});
```

## Adoption of Existing Resources

Adopt an existing ElasticBeanstalk application instead of failing if it already exists.

```ts
import AWS from "alchemy/aws/control";

const adoptExistingApp = await AWS.ElasticBeanstalk.Application("existingApplication", {
  ApplicationName: "ExistingWebApp",
  Description: "This application is being adopted from existing resources.",
  adopt: true
});
```
