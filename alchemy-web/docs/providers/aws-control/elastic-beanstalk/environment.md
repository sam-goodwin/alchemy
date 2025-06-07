---
title: Managing AWS ElasticBeanstalk Environments with Alchemy
description: Learn how to create, update, and manage AWS ElasticBeanstalk Environments using Alchemy Cloud Control.
---

# Environment

The Environment resource lets you manage [AWS ElasticBeanstalk Environments](https://docs.aws.amazon.com/elasticbeanstalk/latest/userguide/) for deploying and scaling web applications and services.

## Minimal Example

Create a basic ElasticBeanstalk environment with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const myEnvironment = await AWS.ElasticBeanstalk.Environment("MyEnvironment", {
  ApplicationName: "MyApp",
  VersionLabel: "v1",
  EnvironmentName: "MyEnvironment",
  PlatformArn: "arn:aws:elasticbeanstalk:us-west-2::platform/MyPlatform",
  OptionSettings: [
    {
      Namespace: "aws:autoscaling:launchconfiguration",
      OptionName: "InstanceType",
      Value: "t2.micro"
    }
  ],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure an ElasticBeanstalk environment with detailed settings, including a custom operations role and additional option settings.

```ts
const advancedEnvironment = await AWS.ElasticBeanstalk.Environment("AdvancedEnvironment", {
  ApplicationName: "MyApp",
  VersionLabel: "v1",
  EnvironmentName: "AdvancedEnvironment",
  OperationsRole: "arn:aws:iam::123456789012:role/MyOperationsRole",
  OptionSettings: [
    {
      Namespace: "aws:elasticbeanstalk:environment",
      OptionName: "EnvironmentType",
      Value: "LoadBalanced"
    },
    {
      Namespace: "aws:autoscaling:launchconfiguration",
      OptionName: "InstanceType",
      Value: "t3.medium"
    },
    {
      Namespace: "aws:elasticbeanstalk:application:environment",
      OptionName: "MY_ENV_VARIABLE",
      Value: "MyValue"
    }
  ],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Custom CNAME Configuration

Set up an ElasticBeanstalk environment with a custom CNAME prefix for easier accessibility.

```ts
const cnameEnvironment = await AWS.ElasticBeanstalk.Environment("CnameEnvironment", {
  ApplicationName: "MyApp",
  VersionLabel: "v1",
  CNAMEPrefix: "myapp-prod",
  EnvironmentName: "CnameEnvironment",
  OptionSettings: [
    {
      Namespace: "aws:elasticbeanstalk:environment",
      OptionName: "CNAME",
      Value: "myapp-prod.us-west-2.elasticbeanstalk.com"
    }
  ]
});
```

## Environment Tier Configuration

Create an ElasticBeanstalk environment with a specific tier configuration for web applications.

```ts
const tierEnvironment = await AWS.ElasticBeanstalk.Environment("TierEnvironment", {
  ApplicationName: "MyWebApp",
  VersionLabel: "v1",
  EnvironmentName: "TierEnvironment",
  Tier: {
    Name: "WebServer",
    Type: "Standard",
    Version: "1.0"
  },
  OptionSettings: [
    {
      Namespace: "aws:elasticbeanstalk:environment",
      OptionName: "EnvironmentType",
      Value: "LoadBalanced"
    }
  ]
});
```