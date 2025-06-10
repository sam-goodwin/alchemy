---
title: MLTransform
description: Learn how to create, update, and manage AWS Glue MLTransforms using Alchemy Cloud Control.
---


The MLTransform resource lets you create and manage [AWS Glue MLTransforms](https://docs.aws.amazon.com/glue/latest/userguide/) for transforming data using machine learning algorithms.

## Minimal Example

Create a basic MLTransform with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const mlTransform = await AWS.Glue.MLTransform("basicTransform", {
  role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  transformParameters: {
    // Example transform parameters
    transformations: [
      {
        name: "SampleTransform",
        parameters: {
          modelType: "linearRegression"
        }
      }
    ]
  },
  inputRecordTables: [
    {
      name: "inputTable",
      databaseName: "myDatabase"
    }
  ],
  description: "A simple MLTransform for demonstration purposes"
});
```

## Advanced Configuration

Configure an MLTransform with advanced settings, including encryption and increased capacity.

```ts
const advancedMlTransform = await AWS.Glue.MLTransform("advancedTransform", {
  role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  transformParameters: {
    transformations: [
      {
        name: "ComplexTransform",
        parameters: {
          modelType: "randomForest",
          featureColumns: ["column1", "column2"],
          targetColumn: "target"
        }
      }
    ]
  },
  inputRecordTables: [
    {
      name: "inputTable",
      databaseName: "myDatabase"
    }
  ],
  transformEncryption: {
    // Example encryption configuration
    mlUserDataEncryption: {
      // Encryption settings
      mode: "DISABLED"
    }
  },
  maxCapacity: 10,
  tags: {
    Project: "MLTransformDemo",
    Environment: "Development"
  }
});
```

## Using Custom Worker Types

Create an MLTransform that specifies a custom worker type and number of workers.

```ts
const customWorkerMlTransform = await AWS.Glue.MLTransform("customWorkerTransform", {
  role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  transformParameters: {
    transformations: [
      {
        name: "CustomWorkerTransform",
        parameters: {
          modelType: "supportVectorMachine",
          hyperparameters: {
            kernel: "rbf",
            gamma: "scale"
          }
        }
      }
    ]
  },
  inputRecordTables: [
    {
      name: "inputTable",
      databaseName: "myDatabase"
    }
  ],
  workerType: "G.1X",
  numberOfWorkers: 2,
  description: "MLTransform using a custom worker type"
});
``` 

## Adding Retry Logic

Configure an MLTransform with retry logic for handling failures.

```ts
const retryMlTransform = await AWS.Glue.MLTransform("retryTransform", {
  role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  transformParameters: {
    transformations: [
      {
        name: "RetryTransform",
        parameters: {
          modelType: "decisionTree",
          maxDepth: 5
        }
      }
    ]
  },
  inputRecordTables: [
    {
      name: "inputTable",
      databaseName: "myDatabase"
    }
  ],
  maxRetries: 3,
  timeout: 60,
  description: "MLTransform with retry logic for fault tolerance"
});
```

These examples demonstrate various configurations for the AWS Glue MLTransform resource, helping you to leverage machine learning for data transformation efficiently.
