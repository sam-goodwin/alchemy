---
title: StackSet
description: Learn how to create, update, and manage AWS CloudFormation StackSets using Alchemy Cloud Control.
---


The StackSet resource lets you manage [AWS CloudFormation StackSets](https://docs.aws.amazon.com/cloudformation/latest/userguide/) for deploying stacks across multiple accounts and regions.

## Minimal Example

Create a basic StackSet with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const stackSet = await AWS.CloudFormation.StackSet("myStackSet", {
  StackSetName: "MyStackSet",
  Description: "This StackSet deploys a sample resource stack to multiple accounts.",
  PermissionModel: "SERVICE_MANAGED",
  TemplateBody: JSON.stringify({
    Resources: {
      MyS3Bucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: "my-sample-bucket"
        }
      }
    }
  })
});
```

## Advanced Configuration

Configure a StackSet with parameters, tags, and auto-deployment settings for better management:

```ts
const advancedStackSet = await AWS.CloudFormation.StackSet("advancedStackSet", {
  StackSetName: "AdvancedStackSet",
  Description: "This StackSet includes parameters and auto-deployment features.",
  PermissionModel: "SERVICE_MANAGED",
  TemplateBody: JSON.stringify({
    Resources: {
      MyDynamoDBTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "MySampleTable",
          AttributeDefinitions: [
            {
              AttributeName: "Id",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "Id",
              KeyType: "HASH"
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        }
      }
    }
  }),
  Parameters: [
    {
      ParameterKey: "Environment",
      ParameterValue: "Production"
    }
  ],
  AutoDeployment: {
    Enabled: true,
    RetainStacksOnAccountRemoval: false
  },
  Tags: [
    {
      Key: "Owner",
      Value: "DevTeam"
    },
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Deploying to Multiple Accounts

Set up a StackSet that deploys a simple EC2 instance stack across multiple accounts with a specified instance type:

```ts
const multiAccountStackSet = await AWS.CloudFormation.StackSet("multiAccountStackSet", {
  StackSetName: "MultiAccountStackSet",
  Description: "Deploys EC2 instances across multiple accounts.",
  PermissionModel: "SERVICE_MANAGED",
  TemplateBody: JSON.stringify({
    Resources: {
      MyEC2Instance: {
        Type: "AWS::EC2::Instance",
        Properties: {
          InstanceType: "t2.micro",
          ImageId: "ami-0abcdef1234567890", // Replace with a valid AMI ID in your region
          KeyName: "my-key-pair" // Replace with your key pair name
        }
      }
    }
  }),
  StackInstancesGroup: [
    {
      AccountId: "123456789012",
      Region: "us-east-1"
    },
    {
      AccountId: "098765432109",
      Region: "us-west-2"
    }
  ]
});
```
