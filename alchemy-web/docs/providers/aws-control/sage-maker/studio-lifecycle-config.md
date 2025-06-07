---
title: Managing AWS SageMaker StudioLifecycleConfigs with Alchemy
description: Learn how to create, update, and manage AWS SageMaker StudioLifecycleConfigs using Alchemy Cloud Control.
---

# StudioLifecycleConfig

The StudioLifecycleConfig resource allows you to create and manage [AWS SageMaker Studio Lifecycle Configurations](https://docs.aws.amazon.com/sagemaker/latest/userguide/), which are scripts that automatically run when a SageMaker Studio app is created or started.

## Minimal Example

Create a basic SageMaker Studio Lifecycle Configuration with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicLifecycleConfig = await AWS.SageMaker.StudioLifecycleConfig("BasicLifecycleConfig", {
  StudioLifecycleConfigAppType: "JupyterServer",
  StudioLifecycleConfigName: "MyBasicLifecycleConfig",
  StudioLifecycleConfigContent: "echo 'Hello from Lifecycle Config!'",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Owner", Value: "data-team" }
  ]
});
```

## Advanced Configuration

Configure a more advanced Lifecycle Configuration that runs multiple commands.

```ts
const advancedLifecycleConfig = await AWS.SageMaker.StudioLifecycleConfig("AdvancedLifecycleConfig", {
  StudioLifecycleConfigAppType: "JupyterServer",
  StudioLifecycleConfigName: "MyAdvancedLifecycleConfig",
  StudioLifecycleConfigContent: `
    #!/bin/bash
    echo 'Setting up environment...'
    pip install -r /home/sagemaker-user/requirements.txt
    echo 'Environment setup complete.'
  `,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Owner", Value: "data-science" }
  ]
});
```

## Custom User Setup

Create a Lifecycle Configuration designed to set up user-specific configurations.

```ts
const userSetupLifecycleConfig = await AWS.SageMaker.StudioLifecycleConfig("UserSetupLifecycleConfig", {
  StudioLifecycleConfigAppType: "JupyterServer",
  StudioLifecycleConfigName: "MyUserSetupLifecycleConfig",
  StudioLifecycleConfigContent: `
    #!/bin/bash
    echo 'Configuring user settings...'
    mkdir -p /home/sagemaker-user/.config/myapp
    echo 'User settings configured.'
  `,
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Owner", Value: "dev-team" }
  ]
});
```

These examples demonstrate how to utilize the SageMaker StudioLifecycleConfig resource effectively, providing configurations tailored for different operational needs.