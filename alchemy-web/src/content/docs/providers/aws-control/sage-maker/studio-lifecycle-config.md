---
title: StudioLifecycleConfig
description: Learn how to create, update, and manage AWS SageMaker StudioLifecycleConfigs using Alchemy Cloud Control.
---


The StudioLifecycleConfig resource lets you manage [AWS SageMaker Studio Lifecycle Configurations](https://docs.aws.amazon.com/sagemaker/latest/userguide/) that define scripts to run when users start or stop their studio sessions.

## Minimal Example

Create a basic StudioLifecycleConfig with required properties and a couple of optional tags.

```ts
import AWS from "alchemy/aws/control";

const lifecycleConfig = await AWS.SageMaker.StudioLifecycleConfig("basic-lifecycle-config", {
  StudioLifecycleConfigAppType: "JupyterServer",
  StudioLifecycleConfigName: "BasicConfig",
  StudioLifecycleConfigContent: "echo 'Welcome to SageMaker Studio!'",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "DataScienceTeam" }
  ]
});
```

## Advanced Configuration

Configure a StudioLifecycleConfig with a custom script that runs additional commands.

```ts
const advancedLifecycleConfig = await AWS.SageMaker.StudioLifecycleConfig("advanced-lifecycle-config", {
  StudioLifecycleConfigAppType: "JupyterServer",
  StudioLifecycleConfigName: "AdvancedConfig",
  StudioLifecycleConfigContent: `
    #!/bin/bash
    echo 'Setting up environment...'
    conda install -y numpy pandas matplotlib
    echo 'Environment setup complete!'
  `,
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## User-Specific Configuration

Create a StudioLifecycleConfig that runs specific commands tailored for a user.

```ts
const userSpecificLifecycleConfig = await AWS.SageMaker.StudioLifecycleConfig("user-specific-lifecycle-config", {
  StudioLifecycleConfigAppType: "JupyterServer",
  StudioLifecycleConfigName: "UserSpecificConfig",
  StudioLifecycleConfigContent: `
    #!/bin/bash
    echo 'Starting custom setup for user session...'
    pip install --upgrade boto3
    echo 'Custom setup completed for user session.'
  `
});
```
