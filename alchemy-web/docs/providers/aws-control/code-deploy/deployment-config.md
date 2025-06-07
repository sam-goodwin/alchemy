---
title: Managing AWS CodeDeploy DeploymentConfigs with Alchemy
description: Learn how to create, update, and manage AWS CodeDeploy DeploymentConfigs using Alchemy Cloud Control.
---

# DeploymentConfig

The DeploymentConfig resource lets you create and manage [AWS CodeDeploy DeploymentConfigs](https://docs.aws.amazon.com/codedeploy/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codedeploy-deploymentconfig.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const deploymentconfig = await AWS.CodeDeploy.DeploymentConfig("deploymentconfig-example", {});
```

