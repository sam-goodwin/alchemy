---
title: DocumentClassifier
description: Learn how to create, update, and manage AWS Comprehend DocumentClassifiers using Alchemy Cloud Control.
---


The DocumentClassifier resource allows you to create and manage document classifiers in [AWS Comprehend](https://docs.aws.amazon.com/comprehend/latest/userguide/). Document classifiers use machine learning to categorize documents based on their content.

## Minimal Example

Create a basic document classifier with required properties and a couple of optional configurations.

```ts
import AWS from "alchemy/aws/control";

const documentClassifier = await AWS.Comprehend.DocumentClassifier("basicClassifier", {
  LanguageCode: "en",
  DataAccessRoleArn: "arn:aws:iam::123456789012:role/service-role/comprehend-access",
  InputDataConfig: {
    S3Uri: "s3://my-bucket/training-data/",
    InputFormat: "ONE_DOC_PER_FILE"
  },
  OutputDataConfig: {
    S3Uri: "s3://my-bucket/output/",
  },
  DocumentClassifierName: "BasicClassifier"
});
```

## Advanced Configuration

Configure a document classifier with advanced settings including VPC configuration and model policies for enhanced control.

```ts
const advancedClassifier = await AWS.Comprehend.DocumentClassifier("advancedClassifier", {
  LanguageCode: "es",
  DataAccessRoleArn: "arn:aws:iam::123456789012:role/service-role/comprehend-access",
  InputDataConfig: {
    S3Uri: "s3://my-bucket/training-data/",
    InputFormat: "ONE_DOC_PER_FILE"
  },
  OutputDataConfig: {
    S3Uri: "s3://my-bucket/output/",
  },
  DocumentClassifierName: "AdvancedClassifier",
  VpcConfig: {
    SecurityGroupIds: ["sg-0123456789abcdef0"],
    Subnets: ["subnet-0123456789abcdef0"],
  },
  ModelPolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: "comprehend:DetectSentiment",
      Resource: "*"
    }]
  })
});
```

## Custom Classifier with Tags

Create a document classifier with specific tags for resource organization and management.

```ts
const taggedClassifier = await AWS.Comprehend.DocumentClassifier("taggedClassifier", {
  LanguageCode: "fr",
  DataAccessRoleArn: "arn:aws:iam::123456789012:role/service-role/comprehend-access",
  InputDataConfig: {
    S3Uri: "s3://my-bucket/training-data/",
    InputFormat: "ONE_DOC_PER_FILE"
  },
  OutputDataConfig: {
    S3Uri: "s3://my-bucket/output/",
  },
  DocumentClassifierName: "TaggedClassifier",
  Tags: [
    { Key: "Project", Value: "NLP" },
    { Key: "Environment", Value: "Production" }
  ]
});
```
