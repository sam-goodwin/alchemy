---
title: Managing AWS Comprehend DocumentClassifiers with Alchemy
description: Learn how to create, update, and manage AWS Comprehend DocumentClassifiers using Alchemy Cloud Control.
---

# DocumentClassifier

The DocumentClassifier resource lets you create and manage [AWS Comprehend DocumentClassifiers](https://docs.aws.amazon.com/comprehend/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-comprehend-documentclassifier.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const documentclassifier = await AWS.Comprehend.DocumentClassifier("documentclassifier-example", {
  LanguageCode: "example-languagecode",
  DataAccessRoleArn: "example-dataaccessrolearn",
  DocumentClassifierName: "documentclassifier-documentclassifier",
  InputDataConfig: "example-inputdataconfig",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a documentclassifier with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDocumentClassifier = await AWS.Comprehend.DocumentClassifier(
  "advanced-documentclassifier",
  {
    LanguageCode: "example-languagecode",
    DataAccessRoleArn: "example-dataaccessrolearn",
    DocumentClassifierName: "documentclassifier-documentclassifier",
    InputDataConfig: "example-inputdataconfig",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

