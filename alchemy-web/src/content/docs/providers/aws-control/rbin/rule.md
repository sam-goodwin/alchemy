---
title: Rule
description: Learn how to create, update, and manage AWS Rbin Rules using Alchemy Cloud Control.
---


The Rule resource allows you to manage [AWS Rbin Rules](https://docs.aws.amazon.com/rbin/latest/userguide/) for retention of AWS resources. These rules help in managing the lifecycle of resources by defining retention policies.

## Minimal Example

Create a simple Rbin Rule with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const simpleRule = await AWS.Rbin.Rule("simple-rule", {
  ResourceType: "AWS::S3::Bucket",
  RetentionPeriod: {
    NumberOfDays: 30
  },
  Status: "ENABLED"
});
```

## Advanced Configuration

Configure a more advanced Rbin Rule with additional options like LockConfiguration and ResourceTags:

```ts
const advancedRule = await AWS.Rbin.Rule("advanced-rule", {
  ResourceType: "AWS::EC2::Instance",
  RetentionPeriod: {
    NumberOfDays: 60
  },
  LockConfiguration: {
    UnlockDelay: {
      NumberOfDays: 7
    }
  },
  ResourceTags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "IT" }
  ],
  Description: "This rule retains EC2 instances for 60 days."
});
```

## Rule with Exclusions

Create a rule that excludes specific resource tags from retention:

```ts
const exclusionRule = await AWS.Rbin.Rule("exclusion-rule", {
  ResourceType: "AWS::RDS::DBInstance",
  RetentionPeriod: {
    NumberOfDays: 90
  },
  ExcludeResourceTags: [
    { Key: "Temporary", Value: "true" }
  ],
  Status: "ENABLED",
  Tags: [
    { Key: "Project", Value: "DataMigration" }
  ]
});
```

## Rule with Adoption of Existing Resource

Define a rule that adopts an existing resource instead of failing if the resource already exists:

```ts
const adoptRule = await AWS.Rbin.Rule("adopt-rule", {
  ResourceType: "AWS::Lambda::Function",
  RetentionPeriod: {
    NumberOfDays: 30
  },
  adopt: true,
  Status: "ENABLED",
  Description: "Adopts existing Lambda functions for retention."
});
```
