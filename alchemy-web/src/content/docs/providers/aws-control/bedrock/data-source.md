---
title: DataSource
description: Learn how to create, update, and manage AWS Bedrock DataSources using Alchemy Cloud Control.
---


The DataSource resource allows you to create and manage [AWS Bedrock DataSources](https://docs.aws.amazon.com/bedrock/latest/userguide/) that can be used for various data processing and machine learning tasks.

## Minimal Example

Create a basic DataSource with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicDataSource = await AWS.Bedrock.DataSource("basic-data-source", {
  name: "CustomerDataSource",
  description: "A data source for customer information.",
  knowledgeBaseId: "customer-knowledge-base",
  dataSourceConfiguration: {
    type: "database",
    connectionDetails: {
      host: "db.example.com",
      port: 5432,
      username: "dbUser",
      password: AWS.secret(process.env.DB_PASSWORD!)
    }
  }
});
```

## Advanced Configuration

Configure a DataSource with encryption settings and a data deletion policy.

```ts
const advancedDataSource = await AWS.Bedrock.DataSource("advanced-data-source", {
  name: "SensitiveCustomerDataSource",
  description: "A secure data source for sensitive customer information.",
  knowledgeBaseId: "customer-knowledge-base",
  dataSourceConfiguration: {
    type: "database",
    connectionDetails: {
      host: "secure-db.example.com",
      port: 5432,
      username: "secureDbUser",
      password: AWS.secret(process.env.SECURE_DB_PASSWORD!)
    }
  },
  serverSideEncryptionConfiguration: {
    enabled: true,
    encryptionAlgorithm: "AES256"
  },
  dataDeletionPolicy: JSON.stringify({
    version: "2012-10-17",
    statement: [
      {
        effect: "Allow",
        action: "bedrock:DeleteDataSource",
        resource: "*"
      }
    ]
  })
});
```

## Custom Vector Ingestion Configuration

Create a DataSource with specific vector ingestion settings for machine learning.

```ts
const vectorDataSource = await AWS.Bedrock.DataSource("vector-data-source", {
  name: "VectorDataSource",
  description: "Data source optimized for vector ingestion.",
  knowledgeBaseId: "vector-knowledge-base",
  dataSourceConfiguration: {
    type: "vector",
    vectorDetails: {
      dimension: 128,
      distanceMetric: "cosine"
    }
  },
  vectorIngestionConfiguration: {
    batchSize: 100,
    ingestionFrequency: "daily"
  }
});
```

## Adopting Existing Resources

Create a new DataSource that adopts an existing resource if it already exists.

```ts
const adoptedDataSource = await AWS.Bedrock.DataSource("adopt-existing-data-source", {
  name: "ExistingDataSource",
  knowledgeBaseId: "existing-knowledge-base",
  dataSourceConfiguration: {
    type: "database",
    connectionDetails: {
      host: "existing-db.example.com",
      port: 5432,
      username: "existingDbUser",
      password: AWS.secret(process.env.EXISTING_DB_PASSWORD!)
    }
  },
  adopt: true // Adopt existing resource instead of failing
});
```
