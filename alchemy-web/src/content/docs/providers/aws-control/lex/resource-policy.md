---
title: ResourcePolicy
description: Learn how to create, update, and manage AWS Lex ResourcePolicys using Alchemy Cloud Control.
---


The ResourcePolicy resource lets you manage [AWS Lex ResourcePolicys](https://docs.aws.amazon.com/lex/latest/userguide/) for your Lex bots, enabling you to control access to your resources through IAM policies.

## Minimal Example

Create a basic resource policy for an AWS Lex bot with required properties.

```ts
import AWS from "alchemy/aws/control";

const lexResourcePolicy = await AWS.Lex.ResourcePolicy("myLexPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "lex:StartConversation",
        Resource: "arn:aws:lex:us-west-2:123456789012:bot:myBot:1"
      }
    ]
  },
  ResourceArn: "arn:aws:lex:us-west-2:123456789012:bot:myBot:1",
  adopt: true
});
```

## Advanced Configuration

Configure a resource policy with additional IAM policy statements for more granular access control.

```ts
const advancedLexResourcePolicy = await AWS.Lex.ResourcePolicy("advancedLexPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:user/Alice"
        },
        Action: [
          "lex:StartConversation",
          "lex:RecognizeUtterance"
        ],
        Resource: "arn:aws:lex:us-west-2:123456789012:bot:myBot:1"
      },
      {
        Effect: "Deny",
        Principal: "*",
        Action: "lex:DeleteBot",
        Resource: "arn:aws:lex:us-west-2:123456789012:bot:myBot:1"
      }
    ]
  },
  ResourceArn: "arn:aws:lex:us-west-2:123456789012:bot:myBot:1"
});
```

## Policy for Specific Actions

Demonstrate how to create a policy that allows only specific users to invoke certain actions on the Lex bot.

```ts
const userSpecificPolicy = await AWS.Lex.ResourcePolicy("userSpecificPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:user/Bob"
        },
        Action: "lex:StartConversation",
        Resource: "arn:aws:lex:us-west-2:123456789012:bot:myBot:1"
      }
    ]
  },
  ResourceArn: "arn:aws:lex:us-west-2:123456789012:bot:myBot:1"
});
```
