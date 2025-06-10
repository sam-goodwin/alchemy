---
title: NotebookInstanceLifecycleConfig
description: Learn how to create, update, and manage AWS SageMaker NotebookInstanceLifecycleConfigs using Alchemy Cloud Control.
---


The NotebookInstanceLifecycleConfig resource allows you to manage the lifecycle configuration for AWS SageMaker Notebook Instances. This includes specifying scripts that run on instance creation and start. For more information, refer to the [AWS SageMaker NotebookInstanceLifecycleConfigs documentation](https://docs.aws.amazon.com/sagemaker/latest/userguide/).

## Minimal Example

Create a basic NotebookInstanceLifecycleConfig with a startup script that installs a package.

```ts
import AWS from "alchemy/aws/control";

const lifecycleConfig = await AWS.SageMaker.NotebookInstanceLifecycleConfig("MyLifecycleConfig", {
  NotebookInstanceLifecycleConfigName: "MyNotebookLifecycleConfig",
  OnCreate: [{
    Content: Buffer.from(`
      #!/bin/bash
      sudo -u ec2-user -i <<'EOF'
      pip install numpy
      EOF
    `).toString('base64')
  }],
  OnStart: [{
    Content: Buffer.from(`
      #!/bin/bash
      sudo -u ec2-user -i <<'EOF'
      echo "Notebook started"
      EOF
    `).toString('base64')
  }]
});
```

## Advanced Configuration

Configure a lifecycle with scripts that run on both creation and start, including custom logging.

```ts
const advancedLifecycleConfig = await AWS.SageMaker.NotebookInstanceLifecycleConfig("AdvancedLifecycleConfig", {
  NotebookInstanceLifecycleConfigName: "AdvancedNotebookLifecycleConfig",
  OnCreate: [{
    Content: Buffer.from(`
      #!/bin/bash
      sudo -u ec2-user -i <<'EOF'
      pip install pandas
      echo "Installation complete" >> /home/ec2-user/lifecycle.log
      EOF
    `).toString('base64')
  }],
  OnStart: [{
    Content: Buffer.from(`
      #!/bin/bash
      sudo -u ec2-user -i <<'EOF'
      echo "Notebook instance has started" >> /home/ec2-user/lifecycle.log
      EOF
    `).toString('base64')
  }]
});
```

## Custom Script for Instance Management

Create a lifecycle configuration that runs a custom script to manage instance resources.

```ts
const resourceManagementConfig = await AWS.SageMaker.NotebookInstanceLifecycleConfig("ResourceManagementConfig", {
  NotebookInstanceLifecycleConfigName: "ResourceManagementLifecycleConfig",
  OnCreate: [{
    Content: Buffer.from(`
      #!/bin/bash
      sudo -u ec2-user -i <<'EOF'
      echo "Starting resource management tasks" >> /home/ec2-user/resource_management.log
      # Custom commands to manage resources
      EOF
    `).toString('base64')
  }],
  OnStart: [{
    Content: Buffer.from(`
      #!/bin/bash
      sudo -u ec2-user -i <<'EOF'
      echo "Resource checks initiated" >> /home/ec2-user/resource_management.log
      # Additional resource checks
      EOF
    `).toString('base64')
  }]
});
```
