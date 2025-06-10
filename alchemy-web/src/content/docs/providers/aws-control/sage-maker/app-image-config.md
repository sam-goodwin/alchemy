---
title: AppImageConfig
description: Learn how to create, update, and manage AWS SageMaker AppImageConfigs using Alchemy Cloud Control.
---


The AppImageConfig resource allows you to manage [AWS SageMaker AppImageConfigs](https://docs.aws.amazon.com/sagemaker/latest/userguide/) that define Docker container images for Jupyter notebook users and other applications in SageMaker. 

## Minimal Example

Create a basic AppImageConfig with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicAppImageConfig = await AWS.SageMaker.AppImageConfig("basicAppImageConfig", {
  AppImageConfigName: "MyAppImageConfig",
  KernelGatewayImageConfig: {
    KernelSpecs: [{
      Name: "python3",
      DisplayName: "Python 3"
    }],
    ImageUri: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-app-image:latest"
  }
});
```

## Advanced Configuration

Enhance your AppImageConfig with additional settings for JupyterLab and Code Editor.

```ts
const advancedAppImageConfig = await AWS.SageMaker.AppImageConfig("advancedAppImageConfig", {
  AppImageConfigName: "MyAdvancedAppImageConfig",
  KernelGatewayImageConfig: {
    KernelSpecs: [{
      Name: "python3",
      DisplayName: "Python 3"
    }],
    ImageUri: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-advanced-image:latest"
  },
  JupyterLabAppImageConfig: {
    ImageUri: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-jupyterlab-image:latest"
  },
  CodeEditorAppImageConfig: {
    ImageUri: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-code-editor-image:latest"
  },
  Tags: [{
    Key: "Project",
    Value: "DataScience"
  }]
});
```

## Custom Tagging

Create an AppImageConfig with custom tags for better resource management.

```ts
const taggedAppImageConfig = await AWS.SageMaker.AppImageConfig("taggedAppImageConfig", {
  AppImageConfigName: "MyTaggedAppImageConfig",
  KernelGatewayImageConfig: {
    KernelSpecs: [{
      Name: "python3",
      DisplayName: "Python 3"
    }],
    ImageUri: "123456789012.dkr.ecr.us-west-2.amazonaws.com/my-tagged-image:latest"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "DataTeam" }
  ]
});
```
