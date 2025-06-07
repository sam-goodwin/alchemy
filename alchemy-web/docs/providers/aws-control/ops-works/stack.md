---
title: Managing AWS OpsWorks Stacks with Alchemy
description: Learn how to create, update, and manage AWS OpsWorks Stacks using Alchemy Cloud Control.
---

# Stack

The Stack resource allows you to create and manage [AWS OpsWorks Stacks](https://docs.aws.amazon.com/opsworks/latest/userguide/) for deploying and managing applications in a scalable manner.

## Minimal Example

Create a basic OpsWorks Stack with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const opsWorksStack = await AWS.OpsWorks.Stack("MyOpsWorksStack", {
  Name: "MyWebAppStack",
  DefaultInstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/MyInstanceProfile",
  ServiceRoleArn: "arn:aws:iam::123456789012:role/MyServiceRole",
  DefaultOs: "Amazon Linux 2",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ],
  EcsClusterArn: "arn:aws:ecs:us-east-1:123456789012:cluster/MyEcsCluster"
});
```

## Advanced Configuration

Configure an OpsWorks Stack with additional advanced settings like custom cookbooks and JSON configuration.

```ts
const advancedOpsWorksStack = await AWS.OpsWorks.Stack("AdvancedOpsWorksStack", {
  Name: "AdvancedWebAppStack",
  DefaultInstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/MyInstanceProfile",
  ServiceRoleArn: "arn:aws:iam::123456789012:role/MyServiceRole",
  CustomCookbooksSource: {
    Type: "git",
    Url: "https://github.com/myorg/mycookbooks.git",
    Revision: "main"
  },
  CustomJson: JSON.stringify({
    "custom": {
      "key": "value"
    }
  }),
  HostnameTheme: "my-app-theme"
});
```

## Using Custom JSON Configuration

Create a stack with a custom JSON configuration to customize the Chef client.

```ts
const customJsonOpsWorksStack = await AWS.OpsWorks.Stack("CustomJsonOpsWorksStack", {
  Name: "CustomJsonAppStack",
  DefaultInstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/MyInstanceProfile",
  ServiceRoleArn: "arn:aws:iam::123456789012:role/MyServiceRole",
  CustomJson: JSON.stringify({
    "deploy": {
      "my_app": {
        "scaling": {
          "instances": 2
        }
      }
    }
  })
});
```

## Cloning an Existing Stack

Clone an existing OpsWorks stack to create a new one with the same settings.

```ts
const clonedOpsWorksStack = await AWS.OpsWorks.Stack("ClonedOpsWorksStack", {
  Name: "ClonedWebAppStack",
  DefaultInstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/MyInstanceProfile",
  ServiceRoleArn: "arn:aws:iam::123456789012:role/MyServiceRole",
  CloneAppIds: ["app-id-1", "app-id-2"],
  ClonePermissions: true,
  SourceStackId: "source-stack-id"
});
```