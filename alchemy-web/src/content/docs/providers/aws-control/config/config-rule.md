---
title: ConfigRule
description: Learn how to create, update, and manage AWS Config ConfigRules using Alchemy Cloud Control.
---


The ConfigRule resource allows you to manage [AWS Config Rules](https://docs.aws.amazon.com/config/latest/userguide/) which evaluate the configuration settings of your AWS resources.

## Minimal Example

Create a simple ConfigRule that checks if EC2 instances have a specific tag:

```ts
import AWS from "alchemy/aws/control";

const ec2TagRule = await AWS.Config.ConfigRule("ec2TagRule", {
  ConfigRuleName: "ec2-instance-tag-check",
  Description: "Check whether EC2 instances have a 'Project' tag",
  Source: {
    Owner: "AWS",
    SourceIdentifier: "EC2_INSTANCE_TAGS"
  },
  Scope: {
    ComplianceResourceTypes: ["AWS::EC2::Instance"]
  },
  MaximumExecutionFrequency: "Six_Hours"
});
```

## Advanced Configuration

This example demonstrates how to set up a ConfigRule with an evaluation mode and custom input parameters:

```ts
import AWS from "alchemy/aws/control";

const advancedRule = await AWS.Config.ConfigRule("advancedComplianceRule", {
  ConfigRuleName: "custom-compliance-rule",
  Description: "Custom compliance rule for S3 bucket encryption",
  Source: {
    Owner: "CUSTOM_LAMBDA",
    SourceIdentifier: "arn:aws:lambda:us-east-1:123456789012:function:customComplianceChecker"
  },
  Scope: {
    ComplianceResourceTypes: ["AWS::S3::Bucket"]
  },
  EvaluationModes: [
    {
      Mode: "MANUAL"
    }
  ],
  InputParameters: {
    encryptionStatus: "ENABLED"
  }
});
```

## Compliance Monitoring

This example illustrates how to create a ConfigRule that checks for compliance against a specific IAM policy:

```ts
import AWS from "alchemy/aws/control";

const iamPolicyComplianceRule = await AWS.Config.ConfigRule("iamPolicyComplianceRule", {
  ConfigRuleName: "iam-policy-compliance-check",
  Description: "Ensure IAM policies do not allow public access",
  Source: {
    Owner: "AWS",
    SourceIdentifier: "IAM_POLICY_COMPLIANCE"
  },
  Scope: {
    ComplianceResourceTypes: ["AWS::IAM::Policy"]
  },
  MaximumExecutionFrequency: "One_Hour"
});
```

## Evaluating Resource Compliance

This example demonstrates a ConfigRule that evaluates compliance based on the presence of a specific tag in resources:

```ts
import AWS from "alchemy/aws/control";

const tagComplianceRule = await AWS.Config.ConfigRule("tagComplianceRule", {
  ConfigRuleName: "required-tag-check",
  Description: "Checks that all resources have the 'Environment' tag",
  Source: {
    Owner: "AWS",
    SourceIdentifier: "RESOURCE_TAGGING"
  },
  Scope: {
    ComplianceResourceTypes: ["AWS::S3::Bucket", "AWS::EC2::Instance", "AWS::IAM::Role"]
  },
  InputParameters: {
    requiredTagKey: "Environment"
  }
});
```
