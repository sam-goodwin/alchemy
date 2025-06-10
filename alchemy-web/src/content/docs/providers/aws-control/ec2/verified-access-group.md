---
title: VerifiedAccessGroup
description: Learn how to create, update, and manage AWS EC2 VerifiedAccessGroups using Alchemy Cloud Control.
---


The VerifiedAccessGroup resource lets you manage [AWS EC2 Verified Access Groups](https://docs.aws.amazon.com/ec2/latest/userguide/) for controlling access to your EC2 instances.

## Minimal Example

Create a basic Verified Access Group with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicVerifiedAccessGroup = await AWS.EC2.VerifiedAccessGroup("basicAccessGroup", {
  VerifiedAccessInstanceId: "vai-0123456789abcdef0",
  Description: "Basic access group for testing",
  PolicyEnabled: true,
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "ec2:DescribeInstances",
        Resource: "*"
      }
    ]
  }),
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
```

## Advanced Configuration

Configure a Verified Access Group with additional security specifications and policy documents.

```ts
const advancedVerifiedAccessGroup = await AWS.EC2.VerifiedAccessGroup("advancedAccessGroup", {
  VerifiedAccessInstanceId: "vai-0123456789abcdef0",
  Description: "Advanced access group with custom policies",
  PolicyEnabled: true,
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "ec2:StartInstances",
        Resource: "arn:aws:ec2:us-west-2:123456789012:instance/*"
      },
      {
        Effect: "Deny",
        Action: "ec2:TerminateInstances",
        Resource: "*"
      }
    ]
  }),
  SseSpecification: {
    KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd-1234-abcd-1234-abcd1234",
    EncryptionEnabled: true
  },
  Tags: [
    {
      Key: "Department",
      Value: "Engineering"
    }
  ]
});
```

## Policy Document Example

Illustrate how to create a Verified Access Group with a more complex IAM policy document.

```ts
const complexPolicyVerifiedAccessGroup = await AWS.EC2.VerifiedAccessGroup("complexPolicyAccessGroup", {
  VerifiedAccessInstanceId: "vai-0123456789abcdef0",
  Description: "Access group with complex IAM policy",
  PolicyEnabled: true,
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "ec2:DescribeInstances",
          "ec2:StartInstances"
        ],
        Resource: "*"
      },
      {
        Effect: "Deny",
        Action: "ec2:StopInstances",
        Resource: "*",
        Condition: {
          StringEquals: {
            "aws:ResourceTag/Environment": "Production"
          }
        }
      }
    ]
  })
});
```

## Adoption of Existing Resources

Use the adopt option to manage an existing Verified Access Group instead of creating a new one.

```ts
const existingVerifiedAccessGroup = await AWS.EC2.VerifiedAccessGroup("existingAccessGroup", {
  VerifiedAccessInstanceId: "vai-0123456789abcdef0",
  Description: "Adopting an existing access group",
  PolicyEnabled: true,
  adopt: true
});
```
