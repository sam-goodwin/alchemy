---
title: Policy
description: Learn how to create, update, and manage AWS FMS Policies using Alchemy Cloud Control.
---


The Policy resource lets you manage [AWS Firewall Manager Policies](https://docs.aws.amazon.com/fms/latest/userguide/) for enforcing rules across your AWS accounts and resources.

## Minimal Example

Create a basic FMS policy with essential properties including a description and tags.

```ts
import AWS from "alchemy/aws/control";

const fmsPolicy = await AWS.FMS.Policy("basicFmsPolicy", {
  PolicyName: "BasicFMSPolicy",
  PolicyDescription: "A basic policy for managing firewall rules.",
  RemediationEnabled: true,
  SecurityServicePolicyData: {
    Type: "WAF",
    WafPolicy: {
      WafWebAclArn: "arn:aws:wafv2:us-east-1:123456789012:regional/webacl/my-web-acl/abcdefg1-2345-6789-abcd-ef1234567890"
    }
  },
  ExcludeResourceTags: false,
  ResourceTags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a policy with additional options including resource cleanup and an include map for tag-based resource selection.

```ts
const advancedFmsPolicy = await AWS.FMS.Policy("advancedFmsPolicy", {
  PolicyName: "AdvancedFMSPolicy",
  PolicyDescription: "An advanced policy with resource cleanup and specific tags.",
  RemediationEnabled: true,
  ResourcesCleanUp: true,
  SecurityServicePolicyData: {
    Type: "WAF",
    WafPolicy: {
      WafWebAclArn: "arn:aws:wafv2:us-east-1:123456789012:regional/webacl/my-web-acl/abcdefg2-2345-6789-abcd-ef1234567890"
    }
  },
  ExcludeResourceTags: false,
  IncludeMap: {
    "resourceType": ["AWS::EC2::Instance"],
    "resourceTag": {"Key": "Environment", "Value": "Production"}
  },
  ResourceTags: [
    { Key: "Application", Value: "WebApp" }
  ]
});
```

## Custom Resource Set Configuration

Create a policy that applies to a specific set of resources using resource set IDs.

```ts
const resourceSetPolicy = await AWS.FMS.Policy("resourceSetFmsPolicy", {
  PolicyName: "ResourceSetFMSPolicy",
  PolicyDescription: "Policy targeting specific resource sets.",
  RemediationEnabled: true,
  ResourceSetIds: [
    "resource-set-id-1",
    "resource-set-id-2"
  ],
  SecurityServicePolicyData: {
    Type: "WAF",
    WafPolicy: {
      WafWebAclArn: "arn:aws:wafv2:us-east-1:123456789012:regional/webacl/my-web-acl/abcdefg3-2345-6789-abcd-ef1234567890"
    }
  },
  ExcludeResourceTags: true
});
```

## Tagging Policies

Demonstrate how to apply tags to manage policies effectively.

```ts
const taggedFmsPolicy = await AWS.FMS.Policy("taggedFmsPolicy", {
  PolicyName: "TaggedFMSPolicy",
  PolicyDescription: "A policy with specific tags to manage resources.",
  RemediationEnabled: false,
  SecurityServicePolicyData: {
    Type: "WAF",
    WafPolicy: {
      WafWebAclArn: "arn:aws:wafv2:us-east-1:123456789012:regional/webacl/my-web-acl/abcdefg4-2345-6789-abcd-ef1234567890"
    }
  },
  ExcludeResourceTags: false,
  ResourceTags: [
    { Key: "Project", Value: "Security" },
    { Key: "Owner", Value: "TeamA" }
  ]
});
```
