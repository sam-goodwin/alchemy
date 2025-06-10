---
title: Environment
description: Learn how to create, update, and manage AWS ElasticBeanstalk Environments using Alchemy Cloud Control.
---


The Environment resource lets you manage [AWS ElasticBeanstalk Environments](https://docs.aws.amazon.com/elasticbeanstalk/latest/userguide/) to deploy and scale web applications and services. 

## Minimal Example

Create a basic ElasticBeanstalk Environment with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const elasticBeanstalkEnv = await AWS.ElasticBeanstalk.Environment("myAppEnvironment", {
  ApplicationName: "MyWebApp",
  PlatformArn: "arn:aws:elasticbeanstalk:us-west-2::platform/Java 8 running on 64bit Amazon Linux/2.9.0",
  Description: "My Elastic Beanstalk environment for the web application"
});
```

## Advanced Configuration

Configure an ElasticBeanstalk Environment with additional options such as custom CNAME prefix and environment tier.

```ts
const advancedElasticBeanstalkEnv = await AWS.ElasticBeanstalk.Environment("advancedEnv", {
  ApplicationName: "MyWebApp",
  PlatformArn: "arn:aws:elasticbeanstalk:us-west-2::platform/Node.js 14 running on 64bit Amazon Linux/2.7.2",
  CNAMEPrefix: "mywebapp",
  Tier: {
    Name: "WebServer",
    Type: "Standard",
    Version: "1.0"
  },
  OptionSettings: [
    {
      Namespace: "aws:autoscaling:launchconfiguration",
      OptionName: "InstanceType",
      Value: "t2.micro"
    },
    {
      Namespace: "aws:elasticbeanstalk:environment",
      OptionName: "EnvironmentType",
      Value: "LoadBalanced"
    }
  ]
});
```

## Using Tags for Organization

Create an environment with tags for better resource organization and management.

```ts
const taggedElasticBeanstalkEnv = await AWS.ElasticBeanstalk.Environment("taggedEnv", {
  ApplicationName: "MyWebApp",
  PlatformArn: "arn:aws:elasticbeanstalk:us-west-2::platform/PHP 7.4 running on 64bit Amazon Linux/2.9.0",
  Tags: [
    {
      Key: "Project",
      Value: "WebApp2023"
    },
    {
      Key: "Owner",
      Value: "DevTeam"
    }
  ]
});
```

## Environment with Custom Options

Demonstrate an environment configured with custom option settings for monitoring and scaling.

```ts
const customOptionsEnv = await AWS.ElasticBeanstalk.Environment("customOptionsEnv", {
  ApplicationName: "MyWebApp",
  PlatformArn: "arn:aws:elasticbeanstalk:us-west-2::platform/DotNet Core 3.1 running on 64bit Amazon Linux/2.3.4",
  OptionSettings: [
    {
      Namespace: "aws:elasticbeanstalk:application",
      OptionName: "ApplicationHealthcheckURL",
      Value: "/health"
    },
    {
      Namespace: "aws:elasticbeanstalk:environment",
      OptionName: "ServiceRole",
      Value: "arn:aws:iam::123456789012:role/elasticbeanstalk-service-role"
    }
  ]
});
```
