---
title: Permission
description: Learn how to create, update, and manage AWS RAM Permissions using Alchemy Cloud Control.
---


The Permission resource allows you to manage [AWS RAM Permissions](https://docs.aws.amazon.com/ram/latest/userguide/) that define the policies associated with resource sharing. This enables you to control access to shared resources effectively.

## Minimal Example

Create a basic RAM Permission with required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const ramPermission = await AWS.RAM.Permission("basicRamPermission", {
  resourceType: "AWS::S3::Bucket",
  policyTemplate: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::my-example-bucket/*"
      }
    ]
  },
  tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ],
  name: "BasicPermission"
});
```

## Advanced Configuration

Configure a RAM Permission with a more complex policy template and multiple tags.

```ts
const advancedRamPermission = await AWS.RAM.Permission("advancedRamPermission", {
  resourceType: "AWS::EC2::Instance",
  policyTemplate: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: ["ec2:StartInstances", "ec2:StopInstances"],
        Resource: "arn:aws:ec2:us-west-2:123456789012:instance/*"
      },
      {
        Effect: "Allow",
        Action: "ec2:DescribeInstances",
        Resource: "*"
      }
    ]
  },
  tags: [
    {
      Key: "Project",
      Value: "CloudMigration"
    },
    {
      Key: "Owner",
      Value: "DevTeam"
    }
  ],
  name: "AdvancedPermission"
});
```

## Custom Policy Example

Create a RAM Permission with a custom policy template that allows specific actions on a DynamoDB table.

```ts
const dynamoDbPermission = await AWS.RAM.Permission("dynamoDbPermission", {
  resourceType: "AWS::DynamoDB::Table",
  policyTemplate: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: ["dynamodb:PutItem", "dynamodb:GetItem"],
        Resource: "arn:aws:dynamodb:us-east-1:123456789012:table/MyExampleTable"
      }
    ]
  },
  tags: [
    {
      Key: "Service",
      Value: "DataProcessing"
    }
  ],
  name: "DynamoDbPermission"
});
```
