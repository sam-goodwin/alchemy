---
title: PolicyStatement
description: Learn how to create, update, and manage AWS EntityResolution PolicyStatements using Alchemy Cloud Control.
---


The PolicyStatement resource allows you to define and manage IAM policies that specify permissions for actions in AWS Entity Resolution. For more information, refer to the [AWS EntityResolution PolicyStatements](https://docs.aws.amazon.com/entityresolution/latest/userguide/).

## Minimal Example

Create a basic PolicyStatement with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicPolicyStatement = await AWS.EntityResolution.PolicyStatement("basicPolicy", {
  StatementId: "AllowS3Access",
  Action: ["s3:ListBucket", "s3:GetObject"],
  Effect: "Allow",
  Condition: "aws:RequestTag/Owner = 'admin'",
  Arn: "arn:aws:entityresolution:us-west-2:123456789012:policy/AllowS3Access"
});
```

## Advanced Configuration

Configure a more complex PolicyStatement with multiple actions and principals.

```ts
const advancedPolicyStatement = await AWS.EntityResolution.PolicyStatement("advancedPolicy", {
  StatementId: "CrossAccountS3Access",
  Action: [
    "s3:PutObject",
    "s3:DeleteObject"
  ],
  Effect: "Allow",
  Principal: ["arn:aws:iam::098765432109:user/OtherAccountUser"],
  Condition: "aws:SourceArn = 'arn:aws:s3:::my-bucket'",
  Arn: "arn:aws:entityresolution:us-west-2:123456789012:policy/CrossAccountS3Access"
});
```

## Resource Adoption

Create a PolicyStatement that will adopt an existing resource if it already exists.

```ts
const adoptPolicyStatement = await AWS.EntityResolution.PolicyStatement("adoptPolicy", {
  StatementId: "AdoptExistingPolicy",
  Action: ["sqs:SendMessage"],
  Effect: "Allow",
  Arn: "arn:aws:entityresolution:us-west-2:123456789012:policy/AdoptExistingPolicy",
  adopt: true
});
```

## Policy with Multiple Conditions

Define a PolicyStatement with multiple conditions for fine-grained access control.

```ts
const conditionalPolicyStatement = await AWS.EntityResolution.PolicyStatement("conditionalPolicy", {
  StatementId: "ConditionalAccess",
  Action: ["dynamodb:GetItem"],
  Effect: "Allow",
  Condition: JSON.stringify({
    "StringEquals": {
      "dynamodb:LeadingKeys": "userId"
    },
    "NumericLessThan": {
      "dynamodb:ReadCapacityUnits": 5
    }
  }),
  Arn: "arn:aws:entityresolution:us-west-2:123456789012:policy/ConditionalAccess"
});
```
