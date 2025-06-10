---
title: ConfigurationTemplate
description: Learn how to create, update, and manage AWS ElasticBeanstalk ConfigurationTemplates using Alchemy Cloud Control.
---


The ConfigurationTemplate resource lets you manage [AWS ElasticBeanstalk ConfigurationTemplates](https://docs.aws.amazon.com/elasticbeanstalk/latest/userguide/) which define the settings for your Elastic Beanstalk environments.

## Minimal Example

Create a basic configuration template with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicConfigTemplate = await AWS.ElasticBeanstalk.ConfigurationTemplate("basicConfigTemplate", {
  ApplicationName: "MyApplication",
  EnvironmentId: "my-environment-id",
  Description: "Basic configuration template for my application"
});
```

## Advanced Configuration

Define an advanced configuration template with custom option settings.

```ts
const advancedConfigTemplate = await AWS.ElasticBeanstalk.ConfigurationTemplate("advancedConfigTemplate", {
  ApplicationName: "MyApplication",
  EnvironmentId: "my-environment-id",
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
  ],
  Description: "Advanced configuration template with custom options"
});
```

## Source Configuration

Create a configuration template based on an existing template for reuse.

```ts
const sourceConfigTemplate = await AWS.ElasticBeanstalk.ConfigurationTemplate("sourceConfigTemplate", {
  ApplicationName: "MyApplication",
  SourceConfiguration: {
    ApplicationName: "MyApplication",
    TemplateName: "baseConfigTemplate"
  },
  Description: "Configuration template derived from baseConfigTemplate"
});
```

## Solution Stack

Configure a template using a specific solution stack name.

```ts
const solutionStackConfigTemplate = await AWS.ElasticBeanstalk.ConfigurationTemplate("solutionStackConfigTemplate", {
  ApplicationName: "MyApplication",
  SolutionStackName: "64bit Amazon Linux 2 v3.3.5 running Python 3.8",
  Description: "Configuration template using a specific solution stack"
});
```
