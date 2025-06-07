---
title: Managing AWS SageMaker PartnerApps with Alchemy
description: Learn how to create, update, and manage AWS SageMaker PartnerApps using Alchemy Cloud Control.
---

# PartnerApp

The PartnerApp resource lets you create and manage [AWS SageMaker PartnerApps](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-partnerapp.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const partnerapp = await AWS.SageMaker.PartnerApp("partnerapp-example", {
  ExecutionRoleArn: "example-executionrolearn",
  Type: "example-type",
  Tier: "example-tier",
  AuthType: "example-authtype",
  Name: "partnerapp-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a partnerapp with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPartnerApp = await AWS.SageMaker.PartnerApp("advanced-partnerapp", {
  ExecutionRoleArn: "example-executionrolearn",
  Type: "example-type",
  Tier: "example-tier",
  AuthType: "example-authtype",
  Name: "partnerapp-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

