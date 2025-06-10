---
title: Domain
description: Learn how to create, update, and manage AWS CustomerProfiles Domains using Alchemy Cloud Control.
---


The Domain resource lets you manage [AWS CustomerProfiles Domains](https://docs.aws.amazon.com/customerprofiles/latest/userguide/) that help you unify customer profiles across different data sources.

## Minimal Example

Create a basic CustomerProfiles Domain with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const customerDomain = await AWS.CustomerProfiles.Domain("customer-domain", {
  DomainName: "customer-profiles-domain",
  DefaultExpirationDays: 30,
  DeadLetterQueueUrl: "https://sqs.us-east-1.amazonaws.com/123456789012/my-queue"
});
```

## Advanced Configuration

Configure a domain with additional matching settings for better profile unification.

```ts
import AWS from "alchemy/aws/control";

const advancedDomain = await AWS.CustomerProfiles.Domain("advanced-domain", {
  DomainName: "advanced-profiles-domain",
  DefaultExpirationDays: 60,
  Matching: {
    MatchingRule: "Strict",
    MatchingAttributes: ["email", "phone"]
  },
  RuleBasedMatching: {
    Rules: [
      {
        RuleName: "EmailMatch",
        Conditions: [
          {
            FieldName: "email",
            Operator: "equals",
            Value: "user@example.com"
          }
        ],
        Actions: [
          {
            ActionName: "MergeProfiles"
          }
        ]
      }
    ]
  }
});
```

## Tagging Example

Create a domain with tags to help with resource management.

```ts
import AWS from "alchemy/aws/control";

const taggedDomain = await AWS.CustomerProfiles.Domain("tagged-domain", {
  DomainName: "tagged-profiles-domain",
  DefaultExpirationDays: 90,
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Team",
      Value: "CustomerSuccess"
    }
  ]
});
```

## Adoption of Existing Resources

Create a domain that adopts an existing resource instead of failing.

```ts
import AWS from "alchemy/aws/control";

const adoptDomain = await AWS.CustomerProfiles.Domain("existing-domain", {
  DomainName: "existing-profiles-domain",
  DefaultExpirationDays: 45,
  adopt: true
});
```
