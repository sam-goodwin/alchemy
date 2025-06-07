---
title: Managing AWS SageMaker Domains with Alchemy
description: Learn how to create, update, and manage AWS SageMaker Domains using Alchemy Cloud Control.
---

# Domain

The Domain resource lets you create and manage [AWS SageMaker Domains](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-domain.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const domain = await AWS.SageMaker.Domain("domain-example", {
  VpcId: "example-vpcid",
  DomainName: "domain-domain",
  DefaultUserSettings: "example-defaultusersettings",
  SubnetIds: ["example-subnetids-1"],
  AuthMode: "example-authmode",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a domain with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDomain = await AWS.SageMaker.Domain("advanced-domain", {
  VpcId: "example-vpcid",
  DomainName: "domain-domain",
  DefaultUserSettings: "example-defaultusersettings",
  SubnetIds: ["example-subnetids-1"],
  AuthMode: "example-authmode",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

