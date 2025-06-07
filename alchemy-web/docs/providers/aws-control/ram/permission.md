---
title: Managing AWS RAM Permissions with Alchemy
description: Learn how to create, update, and manage AWS RAM Permissions using Alchemy Cloud Control.
---

# Permission

The Permission resource allows you to manage [AWS RAM Permissions](https://docs.aws.amazon.com/ram/latest/userguide/) that define what actions can be performed on shared resources. This resource is essential for controlling access to AWS resources that are shared across accounts.

## Minimal Example

Create a basic permission that allows access to a specific resource type.

```ts
import AWS from "alchemy/aws/control";

const BasicPermission = await AWS.RAM.Permission("BasicPermission", {
  ResourceType: "ec2:instance",
  PolicyTemplate: JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: "ec2:StartInstances",
      Resource: "*"
    }]
  }),
  Name: "BasicInstanceStartPermission",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Infrastructure" }
  ]
});
```

## Advanced Configuration

Configure a permission with more complex IAM policy statements for multiple actions.

```ts
const AdvancedPermission = await AWS.RAM.Permission("AdvancedPermission", {
  ResourceType: "s3:bucket",
  PolicyTemplate: JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      Resource: "arn:aws:s3:::my-example-bucket/*"
    }]
  }),
  Name: "AdvancedS3Permission",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Data" }
  ],
  adopt: true // Adopt existing permission if it already exists
});
```

## Specific Use Case for Cross-Account Access

Create a permission that allows access to a resource type across AWS accounts.

```ts
const CrossAccountPermission = await AWS.RAM.Permission("CrossAccountPermission", {
  ResourceType: "lambda:function",
  PolicyTemplate: JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: "lambda:InvokeFunction",
      Resource: "arn:aws:lambda:us-west-2:123456789012:function:MyFunction",
      Condition: {
        "StringEquals": {
          "aws:SourceAccount": "098765432109"
        }
      }
    }]
  }),
  Name: "CrossAccountLambdaInvokePermission",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "Dev" }
  ]
});
```

In each example above, the `Permission` resource is utilized to set up various access permissions tailored to specific AWS resource requirements, enhancing security and resource management within AWS accounts.