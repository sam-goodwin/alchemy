---
title: ResourceSet
description: Learn how to create, update, and manage AWS Route53RecoveryReadiness ResourceSets using Alchemy Cloud Control.
---


The ResourceSet resource lets you manage [AWS Route53RecoveryReadiness ResourceSets](https://docs.aws.amazon.com/route53recoveryreadiness/latest/userguide/) for organizing AWS resources in a recovery readiness strategy.

## Minimal Example

Create a basic ResourceSet with required properties and some optional tags.

```ts
import AWS from "alchemy/aws/control";

const basicResourceSet = await AWS.Route53RecoveryReadiness.ResourceSet("basicResourceSet", {
  ResourceSetType: "AWS::Route53RecoveryReadiness::ResourceSet",
  ResourceSetName: "MyResourceSet",
  Resources: [
    {
      Type: "AWS::EC2::Instance",
      Identifier: "i-1234567890abcdef0"
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a ResourceSet with multiple resources and additional optional properties.

```ts
const advancedResourceSet = await AWS.Route53RecoveryReadiness.ResourceSet("advancedResourceSet", {
  ResourceSetType: "AWS::Route53RecoveryReadiness::ResourceSet",
  ResourceSetName: "AdvancedResourceSet",
  Resources: [
    {
      Type: "AWS::EC2::Instance",
      Identifier: "i-0abcdef1234567890"
    },
    {
      Type: "AWS::RDS::DBInstance",
      Identifier: "myDatabaseInstance"
    }
  ],
  Tags: [
    {
      Key: "Project",
      Value: "RecoveryPlan"
    },
    {
      Key: "Owner",
      Value: "DevTeam"
    }
  ],
  adopt: true
});
```

## Using Multiple Resource Types

Create a ResourceSet that includes different types of resources for comprehensive recovery readiness.

```ts
const multiResourceSet = await AWS.Route53RecoveryReadiness.ResourceSet("multiResourceSet", {
  ResourceSetType: "AWS::Route53RecoveryReadiness::ResourceSet",
  ResourceSetName: "MultiResourceSet",
  Resources: [
    {
      Type: "AWS::EC2::Instance",
      Identifier: "i-0987654321abcdef0"
    },
    {
      Type: "AWS::Lambda::Function",
      Identifier: "myLambdaFunction"
    },
    {
      Type: "AWS::S3::Bucket",
      Identifier: "my-recovery-bucket"
    }
  ],
  Tags: [
    {
      Key: "Purpose",
      Value: "DisasterRecovery"
    }
  ]
});
```

## Adoption of Existing Resources

Create a ResourceSet that adopts existing AWS resources instead of failing if they already exist.

```ts
const adoptResourceSet = await AWS.Route53RecoveryReadiness.ResourceSet("adoptResourceSet", {
  ResourceSetType: "AWS::Route53RecoveryReadiness::ResourceSet",
  ResourceSetName: "AdoptExistingResources",
  Resources: [
    {
      Type: "AWS::EC2::Instance",
      Identifier: "i-1122334455667788"
    }
  ],
  adopt: true
});
```
