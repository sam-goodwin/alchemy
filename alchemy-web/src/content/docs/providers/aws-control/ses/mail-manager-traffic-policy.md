---
title: MailManagerTrafficPolicy
description: Learn how to create, update, and manage AWS SES MailManagerTrafficPolicys using Alchemy Cloud Control.
---


The MailManagerTrafficPolicy resource allows you to create and manage AWS SES Mail Manager traffic policies, which define the rules for handling email traffic in your application. For more information, refer to the [AWS SES MailManagerTrafficPolicys documentation](https://docs.aws.amazon.com/ses/latest/userguide/).

## Minimal Example

Create a basic MailManagerTrafficPolicy with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const trafficPolicy = await AWS.SES.MailManagerTrafficPolicy("basicTrafficPolicy", {
  DefaultAction: "ALLOW",
  PolicyStatements: [
    {
      Effect: "Allow",
      Action: "ses:SendEmail",
      Resource: "*",
      Condition: {
        StringEquals: {
          "ses:From": "no-reply@example.com"
        }
      }
    }
  ],
  TrafficPolicyName: "BasicPolicy"
});
```

## Advanced Configuration

Configure a MailManagerTrafficPolicy with multiple policy statements and additional properties:

```ts
const advancedTrafficPolicy = await AWS.SES.MailManagerTrafficPolicy("advancedTrafficPolicy", {
  DefaultAction: "DENY",
  PolicyStatements: [
    {
      Effect: "Allow",
      Action: "ses:SendEmail",
      Resource: "*",
      Condition: {
        StringEquals: {
          "ses:From": "support@example.com"
        }
      }
    },
    {
      Effect: "Deny",
      Action: "ses:SendEmail",
      Resource: "*",
      Condition: {
        StringEquals: {
          "ses:From": "spam@example.com"
        }
      }
    }
  ],
  TrafficPolicyName: "AdvancedPolicy",
  MaxMessageSizeBytes: 1048576, // 1 MB
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "EmailService" }
  ]
});
```

## Example with Existing Resource Adoption

Create a MailManagerTrafficPolicy that adopts an existing resource instead of failing if it already exists:

```ts
const adoptedTrafficPolicy = await AWS.SES.MailManagerTrafficPolicy("adoptedTrafficPolicy", {
  DefaultAction: "ALLOW",
  PolicyStatements: [
    {
      Effect: "Allow",
      Action: "ses:SendEmail",
      Resource: "*"
    }
  ],
  TrafficPolicyName: "AdoptedPolicy",
  adopt: true // Adopt existing resource if it exists
});
```
