---
title: DeploymentGroup
description: Learn how to create, update, and manage AWS CodeDeploy DeploymentGroups using Alchemy Cloud Control.
---


The DeploymentGroup resource lets you manage [AWS CodeDeploy DeploymentGroups](https://docs.aws.amazon.com/codedeploy/latest/userguide/) for deploying applications across Amazon EC2 instances or other compute platforms.

## Minimal Example

Create a basic deployment group with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const deploymentGroup = await AWS.CodeDeploy.DeploymentGroup("myDeploymentGroup", {
  ApplicationName: "MyApp",
  ServiceRoleArn: "arn:aws:iam::123456789012:role/CodeDeployRole",
  DeploymentConfigName: "CodeDeployDefault.AllAtOnce",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ],
  Ec2TagFilters: [
    {
      Key: "Name",
      Value: "MyEC2Instance",
      Type: "KEY_AND_VALUE"
    }
  ]
});
```

## Advanced Configuration

Configure a deployment group with blue/green deployment settings and auto rollback capabilities.

```ts
const advancedDeploymentGroup = await AWS.CodeDeploy.DeploymentGroup("advancedDeploymentGroup", {
  ApplicationName: "MyAdvancedApp",
  ServiceRoleArn: "arn:aws:iam::123456789012:role/CodeDeployRole",
  DeploymentConfigName: "CodeDeployDefault.OneAtATime",
  BlueGreenDeploymentConfiguration: {
    TerminateBlueInstancesOnSuccess: {
      Action: "TERMINATE",
      WaitTimeInMinutes: 5
    },
    DeploymentReadyOption: {
      ActionOnTimeout: "CONTINUE_DEPLOYMENT"
    }
  },
  AutoRollbackConfiguration: {
    Enabled: true,
    Events: ["DEPLOYMENT_FAILURE"]
  }
});
```

## Load Balancer Integration

Create a deployment group integrated with an Elastic Load Balancer.

```ts
const loadBalancedDeploymentGroup = await AWS.CodeDeploy.DeploymentGroup("loadBalancedDeploymentGroup", {
  ApplicationName: "MyLoadBalancedApp",
  ServiceRoleArn: "arn:aws:iam::123456789012:role/CodeDeployRole",
  LoadBalancerInfo: {
    ElbInfoList: [
      {
        Name: "my-load-balancer"
      }
    ]
  },
  DeploymentConfigName: "CodeDeployDefault.HalfAtATime",
  ECSServices: [
    {
      ClusterName: "my-cluster",
      ServiceName: "my-ecs-service"
    }
  ]
});
```

## On-Premises Deployment

Set up a deployment group for on-premises instances with tagging.

```ts
const onPremisesDeploymentGroup = await AWS.CodeDeploy.DeploymentGroup("onPremisesDeploymentGroup", {
  ApplicationName: "MyOnPremisesApp",
  ServiceRoleArn: "arn:aws:iam::123456789012:role/CodeDeployRole",
  OnPremisesInstanceTagFilters: [
    {
      Key: "Environment",
      Value: "Development",
      Type: "KEY_AND_VALUE"
    }
  ],
  DeploymentConfigName: "CodeDeployDefault.AllAtOnce",
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
``` 

This documentation provides a comprehensive overview of the AWS CodeDeploy DeploymentGroup resource, showcasing basic usage and advanced configurations to suit various deployment strategies.
