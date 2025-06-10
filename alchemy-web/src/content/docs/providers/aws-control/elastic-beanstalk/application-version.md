---
title: ApplicationVersion
description: Learn how to create, update, and manage AWS ElasticBeanstalk ApplicationVersions using Alchemy Cloud Control.
---


The ApplicationVersion resource allows you to manage [AWS ElasticBeanstalk ApplicationVersions](https://docs.aws.amazon.com/elasticbeanstalk/latest/userguide/) and their deployment configurations.

## Minimal Example

Create a basic Elastic Beanstalk application version with required properties.

```ts
import AWS from "alchemy/aws/control";

const appVersion = await AWS.ElasticBeanstalk.ApplicationVersion("myAppVersion", {
  ApplicationName: "MyWebApp",
  SourceBundle: {
    S3Bucket: "my-app-bucket",
    S3Key: "my-app-v1.zip"
  },
  Description: "Initial version of my web application"
});
```

## Advanced Configuration

Create an application version with additional properties like adopting existing resources.

```ts
const advancedAppVersion = await AWS.ElasticBeanstalk.ApplicationVersion("advancedAppVersion", {
  ApplicationName: "MyWebApp",
  SourceBundle: {
    S3Bucket: "my-app-bucket",
    S3Key: "my-app-v2.zip"
  },
  Description: "Updated version of my web application",
  adopt: true // Adopt existing resource if it already exists
});
```

## Version with Custom Source Bundle

Deploy an application version using a different source bundle configuration.

```ts
const customSourceBundleVersion = await AWS.ElasticBeanstalk.ApplicationVersion("customSourceBundleVersion", {
  ApplicationName: "MyWebApp",
  SourceBundle: {
    S3Bucket: "my-app-bucket",
    S3Key: "my-app-v3.zip"
  },
  Description: "Version with a custom source bundle"
});
```

## Application Version with No Description

Create an application version without providing a description.

```ts
const noDescriptionVersion = await AWS.ElasticBeanstalk.ApplicationVersion("noDescriptionVersion", {
  ApplicationName: "MyWebApp",
  SourceBundle: {
    S3Bucket: "my-app-bucket",
    S3Key: "my-app-v4.zip"
  }
});
```
