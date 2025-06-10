---
title: PolicyTemplate
description: Learn how to create, update, and manage AWS VerifiedPermissions PolicyTemplates using Alchemy Cloud Control.
---


The PolicyTemplate resource allows you to create and manage [AWS VerifiedPermissions PolicyTemplates](https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/) that define permission policies for your applications.

## Minimal Example

Create a basic policy template with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicPolicyTemplate = await AWS.VerifiedPermissions.PolicyTemplate("basicPolicyTemplate", {
  Description: "Basic policy template for user permissions",
  Statement: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::my-bucket/*"
      }
    ]
  }),
  PolicyStoreId: "myPolicyStore"
});
```

## Advanced Configuration

Define a more complex policy template with additional permissions and a longer description.

```ts
const advancedPolicyTemplate = await AWS.VerifiedPermissions.PolicyTemplate("advancedPolicyTemplate", {
  Description: "Advanced policy template for managing user access to S3 and DynamoDB",
  Statement: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "s3:GetObject",
          "s3:PutObject"
        ],
        Resource: "arn:aws:s3:::my-advanced-bucket/*"
      },
      {
        Effect: "Allow",
        Action: "dynamodb:Query",
        Resource: "arn:aws:dynamodb:us-east-1:123456789012:table/MyTable"
      }
    ]
  }),
  PolicyStoreId: "myAdvancedPolicyStore"
});
```

## Adopt Existing Resource

Create a policy template that adopts an existing resource instead of failing if the resource already exists.

```ts
const adoptPolicyTemplate = await AWS.VerifiedPermissions.PolicyTemplate("adoptPolicyTemplate", {
  Description: "Adopt existing policy template",
  Statement: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "lambda:InvokeFunction",
        Resource: "arn:aws:lambda:us-east-1:123456789012:function:myFunction"
      }
    ]
  }),
  PolicyStoreId: "myAdoptPolicyStore",
  adopt: true
});
```
