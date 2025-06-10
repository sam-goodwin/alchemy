---
title: DataAutomationProject
description: Learn how to create, update, and manage AWS Bedrock DataAutomationProjects using Alchemy Cloud Control.
---


The DataAutomationProject resource lets you manage [AWS Bedrock DataAutomationProjects](https://docs.aws.amazon.com/bedrock/latest/userguide/) for automating data processing and workflows.

## Minimal Example

Create a basic DataAutomationProject with the required properties and a KMS key for encryption.

```ts
import AWS from "alchemy/aws/control";

const dataAutomationProject = await AWS.Bedrock.DataAutomationProject("myDataAutomationProject", {
  ProjectName: "MyFirstDataAutomationProject",
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  ProjectDescription: "This project automates data processing tasks."
});
```

## Advanced Configuration

Configure a DataAutomationProject with custom output and override configurations for more control over automation.

```ts
const advancedDataAutomationProject = await AWS.Bedrock.DataAutomationProject("advancedDataAutomationProject", {
  ProjectName: "MyAdvancedProject",
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  CustomOutputConfiguration: {
    format: "json",
    destination: "s3://my-output-bucket/outputs/"
  },
  OverrideConfiguration: {
    timeout: 300,
    maxRetries: 5
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Data Science" }
  ]
});
```

## Standard Output Configuration

Set up a DataAutomationProject with standard output configuration to direct the results of the automation.

```ts
const projectWithStandardOutput = await AWS.Bedrock.DataAutomationProject("standardOutputProject", {
  ProjectName: "StandardOutputProject",
  StandardOutputConfiguration: {
    outputPath: "s3://my-output-bucket/standard-outputs/",
    format: "csv"
  }
});
```

## Using KMS Encryption

Create a DataAutomationProject that includes KMS encryption context for enhanced security.

```ts
const secureProject = await AWS.Bedrock.DataAutomationProject("secureProject", {
  ProjectName: "SecureDataProject",
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  KmsEncryptionContext: {
    "Project": "SecureDataProject",
    "Owner": "DataTeam"
  }
});
``` 

## Adopting Existing Resource

If you need to adopt an existing DataAutomationProject instead of failing, set the adopt property to true.

```ts
const adoptedProject = await AWS.Bedrock.DataAutomationProject("existingProject", {
  ProjectName: "AdoptedDataProject",
  adopt: true
});
```
