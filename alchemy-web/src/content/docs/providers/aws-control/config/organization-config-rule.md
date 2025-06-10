---
title: OrganizationConfigRule
description: Learn how to create, update, and manage AWS Config OrganizationConfigRules using Alchemy Cloud Control.
---


The OrganizationConfigRule resource allows you to create and manage AWS Config Organization Config Rules, which are used to evaluate whether your AWS resources comply with specified configurations. For more information, refer to the [AWS Config OrganizationConfigRules documentation](https://docs.aws.amazon.com/config/latest/userguide/).

## Minimal Example

Create a basic Organization Config Rule with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicOrganizationConfigRule = await AWS.Config.OrganizationConfigRule("basicConfigRule", {
  OrganizationConfigRuleName: "myBasicConfigRule",
  OrganizationManagedRuleMetadata: {
    Description: "A basic organization config rule to check resource compliance.",
    RuleIdentifier: "AWS::Config::ManagedRule::RequiredTags"
  }
});
```

## Advanced Configuration

Set up an Organization Config Rule with custom metadata and excluded accounts.

```ts
const advancedOrganizationConfigRule = await AWS.Config.OrganizationConfigRule("advancedConfigRule", {
  OrganizationConfigRuleName: "myAdvancedConfigRule",
  OrganizationCustomRuleMetadata: {
    Description: "An advanced organization config rule for custom compliance checks.",
    InputParameters: JSON.stringify({ key: "value" }),
    LambdaFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:myLambdaFunction",
    MaximumExecutionFrequency: "One_Hour"
  },
  ExcludedAccounts: ["123456789012", "987654321098"]
});
```

## Custom Policy Rule Example

Create an Organization Config Rule using a custom policy rule with IAM policy JSON.

```ts
const customPolicyRule = await AWS.Config.OrganizationConfigRule("customPolicyConfigRule", {
  OrganizationConfigRuleName: "myCustomPolicyConfigRule",
  OrganizationCustomPolicyRuleMetadata: {
    Description: "Custom policy rule to enforce tag compliance across accounts.",
    InputParameters: JSON.stringify({ requiredTag: "env" }),
    PolicyRuntime: "AWS_LAMBDA_POWERSHELL_1_4",
    Source: {
      Owner: "AWS",
      SourceIdentifier: "AWS::Config::CustomPolicy",
      SourceDetails: [
        {
          EventSource: "aws.config",
          MessageType: "ConfigurationItemChangeNotification"
        }
      ]
    }
  }
});
```

## Exclusion of Specific Accounts

Define an Organization Config Rule while excluding certain accounts from evaluation.

```ts
const exclusionConfigRule = await AWS.Config.OrganizationConfigRule("exclusionConfigRule", {
  OrganizationConfigRuleName: "myExclusionConfigRule",
  OrganizationManagedRuleMetadata: {
    Description: "Rule that excludes specific accounts from compliance checks.",
    RuleIdentifier: "AWS::Config::ManagedRule::S3BucketPublicReadProhibited"
  },
  ExcludedAccounts: ["123456789012", "234567890123"]
});
```
