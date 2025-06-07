---
title: Managing AWS ElasticBeanstalk ConfigurationTemplates with Alchemy
description: Learn how to create, update, and manage AWS ElasticBeanstalk ConfigurationTemplates using Alchemy Cloud Control.
---

# ConfigurationTemplate

The ConfigurationTemplate resource lets you create and manage [AWS ElasticBeanstalk ConfigurationTemplates](https://docs.aws.amazon.com/elasticbeanstalk/latest/userguide/) for your applications, allowing you to define environment configurations and reuse them across environments.

## Minimal Example

Create a basic ElasticBeanstalk ConfigurationTemplate with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const BasicConfigurationTemplate = await AWS.ElasticBeanstalk.ConfigurationTemplate("BasicConfigTemplate", {
  ApplicationName: "MyWebApp",
  Description: "Basic configuration for MyWebApp",
  EnvironmentId: "e-abc123",
  PlatformArn: "arn:aws:elasticbeanstalk:us-west-2::platform/PHP 7.4 running on 64bit Amazon Linux 2",
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

## Advanced Configuration

Configure an ElasticBeanstalk ConfigurationTemplate with additional settings including a source configuration.

```ts
const AdvancedConfigurationTemplate = await AWS.ElasticBeanstalk.ConfigurationTemplate("AdvancedConfigTemplate", {
  ApplicationName: "MyWebApp",
  Description: "Advanced configuration for MyWebApp with source settings",
  SourceConfiguration: {
    ApplicationName: "MyWebApp",
    TemplateName: "BaseTemplate"
  },
  OptionSettings: [
    {
      Namespace: "aws:elasticbeanstalk:environment",
      OptionName: "ServiceRole",
      Value: "aws-elasticbeanstalk-ec2-role"
    },
    {
      Namespace: "aws:elasticbeanstalk:sns:topics",
      OptionName: "NotificationTopic",
      Value: "arn:aws:sns:us-west-2:123456789012:MySNSTopic"
    }
  ]
});
```

## Reusable Configuration

Create a ConfigurationTemplate that can be reused across multiple environments.

```ts
const ReusableConfigurationTemplate = await AWS.ElasticBeanstalk.ConfigurationTemplate("ReusableConfigTemplate", {
  ApplicationName: "MyWebApp",
  Description: "Reusable configuration for different environments",
  EnvironmentId: "e-def456",
  PlatformArn: "arn:aws:elasticbeanstalk:us-west-2::platform/DotNet Core 3.1 running on Windows Server 2019",
  OptionSettings: [
    {
      Namespace: "aws:autoscaling:launchconfiguration",
      OptionName: "InstanceMinCount",
      Value: "1"
    },
    {
      Namespace: "aws:autoscaling:trigger",
      OptionName: "UpperThreshold",
      Value: "70"
    },
    {
      Namespace: "aws:elasticbeanstalk:environment",
      OptionName: "EnvironmentType",
      Value: "SingleInstance"
    }
  ]
});
```