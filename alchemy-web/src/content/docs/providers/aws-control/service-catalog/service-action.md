---
title: ServiceAction
description: Learn how to create, update, and manage AWS ServiceCatalog ServiceActions using Alchemy Cloud Control.
---


The ServiceAction resource lets you manage AWS ServiceCatalog ServiceActions, which allow you to define and execute actions on AWS resources within a service catalog. For more details, refer to the [AWS ServiceCatalog ServiceActions](https://docs.aws.amazon.com/servicecatalog/latest/userguide/).

## Minimal Example

Create a basic ServiceAction with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicServiceAction = await AWS.ServiceCatalog.ServiceAction("basicServiceAction", {
  Name: "LaunchEC2Instances",
  DefinitionType: "AWS::CloudFormation::Stack",
  Definition: [
    {
      Name: "InstanceCount",
      Type: "String",
      Required: true,
      DefaultValue: "1"
    }
  ],
  Description: "Launch EC2 instances with specified parameters"
});
```

## Advanced Configuration

Configure a ServiceAction with multiple definitions and additional optional properties.

```ts
const advancedServiceAction = await AWS.ServiceCatalog.ServiceAction("advancedServiceAction", {
  Name: "ConfigureS3Bucket",
  DefinitionType: "AWS::CloudFormation::Stack",
  Definition: [
    {
      Name: "BucketName",
      Type: "String",
      Required: true,
      DefaultValue: "my-unique-bucket-name"
    },
    {
      Name: "Versioning",
      Type: "String",
      Required: false,
      DefaultValue: "Enabled"
    }
  ],
  Description: "Create and configure an S3 bucket with versioning enabled",
  AcceptLanguage: "en"
});
```

## Using with IAM Policies

Create a ServiceAction that includes an IAM policy for permissions.

```ts
const serviceActionWithPolicy = await AWS.ServiceCatalog.ServiceAction("serviceActionWithPolicy", {
  Name: "ManageDynamoDB",
  DefinitionType: "AWS::CloudFormation::Stack",
  Definition: [
    {
      Name: "TableName",
      Type: "String",
      Required: true,
      DefaultValue: "myDynamoDBTable"
    }
  ],
  Description: "Create and manage a DynamoDB table",
  DefinitionType: "AWS::CloudFormation::Stack",
  AcceptLanguage: "en"
});

// Attach IAM policy for permissions
const iamPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: [
        "dynamodb:CreateTable",
        "dynamodb:UpdateTable",
        "dynamodb:DeleteTable"
      ],
      Resource: "*"
    }
  ]
};
```

## Resource Adoption

Create a ServiceAction that adopts existing resources if they already exist.

```ts
const adoptServiceAction = await AWS.ServiceCatalog.ServiceAction("adoptServiceAction", {
  Name: "AdoptExistingEC2Instance",
  DefinitionType: "AWS::CloudFormation::Stack",
  Definition: [
    {
      Name: "InstanceId",
      Type: "String",
      Required: true
    }
  ],
  Description: "Adopt an existing EC2 instance",
  adopt: true
});
```
