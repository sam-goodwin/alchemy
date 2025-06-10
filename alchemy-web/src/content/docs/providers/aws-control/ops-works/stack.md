---
title: Stack
description: Learn how to create, update, and manage AWS OpsWorks Stacks using Alchemy Cloud Control.
---


The Stack resource lets you manage [AWS OpsWorks Stacks](https://docs.aws.amazon.com/opsworks/latest/userguide/) for deploying and managing applications in a flexible and scalable way.

## Minimal Example

Create a basic OpsWorks stack with required properties and a few common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const basicOpsWorksStack = await AWS.OpsWorks.Stack("myBasicStack", {
  name: "MyFirstOpsWorksStack",
  serviceRoleArn: "arn:aws:iam::123456789012:role/MyOpsWorksServiceRole",
  defaultInstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/MyOpsWorksInstanceProfile",
  defaultOs: "Amazon Linux 2",
  useCustomCookbooks: false
});
```

## Advanced Configuration

Configure an OpsWorks stack with a custom VPC and enhanced settings.

```ts
const advancedOpsWorksStack = await AWS.OpsWorks.Stack("myAdvancedStack", {
  name: "MyAdvancedOpsWorksStack",
  serviceRoleArn: "arn:aws:iam::123456789012:role/MyOpsWorksServiceRole",
  defaultInstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/MyOpsWorksInstanceProfile",
  defaultOs: "Ubuntu 20.04",
  vpcId: "vpc-0abcd1234efgh5678",
  defaultAvailabilityZone: "us-west-2a",
  useOpsworksSecurityGroups: true,
  elasticIps: [{
    ip: "203.0.113.0"
  }],
  tags: [{
    key: "Environment",
    value: "Production"
  }]
});
```

## Custom Chef Configuration

Set up a stack with custom Chef configuration for better control over deployment.

```ts
const chefConfiguredStack = await AWS.OpsWorks.Stack("myChefConfiguredStack", {
  name: "MyChefConfiguredStack",
  serviceRoleArn: "arn:aws:iam::123456789012:role/MyOpsWorksServiceRole",
  defaultInstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/MyOpsWorksInstanceProfile",
  chefConfiguration: {
    berkshelfVersion: "3.2.3",
    manageBerkshelf: true
  },
  customCookbooksSource: {
    type: "git",
    url: "https://github.com/my-org/my-cookbooks.git",
    revision: "main"
  }
});
```

## Cloning an Existing Stack

Clone an existing OpsWorks stack with specific attributes and permissions.

```ts
const clonedOpsWorksStack = await AWS.OpsWorks.Stack("myClonedStack", {
  name: "MyClonedOpsWorksStack",
  serviceRoleArn: "arn:aws:iam::123456789012:role/MyOpsWorksServiceRole",
  defaultInstanceProfileArn: "arn:aws:iam::123456789012:instance-profile/MyOpsWorksInstanceProfile",
  cloneAppIds: ["myExistingAppId"],
  clonePermissions: true,
  sourceStackId: "mySourceStackId"
});
```
