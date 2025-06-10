---
title: RemediationConfiguration
description: Learn how to create, update, and manage AWS Config RemediationConfigurations using Alchemy Cloud Control.
---


The RemediationConfiguration resource lets you manage [AWS Config RemediationConfigurations](https://docs.aws.amazon.com/config/latest/userguide/) for automatically remediating non-compliant resources in your AWS environment.

## Minimal Example

Create a basic remediation configuration with required properties and a couple of optional ones.

```ts
import AWS from "alchemy/aws/control";

const remediationConfig = await AWS.Config.RemediationConfiguration("basicRemediationConfig", {
  ConfigRuleName: "myConfigRule",
  TargetType: "AWS::EC2::Instance",
  TargetId: "myRemediationTarget",
  Automatic: true,
  MaximumAutomaticAttempts: 3,
});
```

## Advanced Configuration

Configure a remediation with execution controls and parameters for finer control over the remediation process.

```ts
const advancedRemediationConfig = await AWS.Config.RemediationConfiguration("advancedRemediationConfig", {
  ConfigRuleName: "myAdvancedConfigRule",
  TargetType: "AWS::S3::Bucket",
  TargetId: "myS3RemediationTarget",
  ExecutionControls: {
    SsmControls: {
      ConcurrentExecutionRatePercentage: 100,
      ErrorPercentage: 0,
    },
  },
  Parameters: {
    BucketName: JSON.stringify("my-remediation-bucket"),
    Region: JSON.stringify("us-west-2"),
  },
  Automatic: true,
});
```

## Custom Retry Logic

Set up a remediation configuration with custom retry logic for handling failures during the remediation process.

```ts
const customRetryRemediationConfig = await AWS.Config.RemediationConfiguration("customRetryRemediationConfig", {
  ConfigRuleName: "myRetryConfigRule",
  TargetType: "AWS::IAM::Role",
  TargetId: "myIamRoleRemediationTarget",
  RetryAttemptSeconds: 30,
  MaximumAutomaticAttempts: 5,
  Automatic: true,
});
```

## Manual Remediation Example

Demonstrate a manual remediation configuration that requires human intervention.

```ts
const manualRemediationConfig = await AWS.Config.RemediationConfiguration("manualRemediationConfig", {
  ConfigRuleName: "myManualConfigRule",
  TargetType: "AWS::EC2::Instance",
  TargetId: "myManualRemediationTarget",
  Automatic: false,
});
```
