---
title: Transformer
description: Learn how to create, update, and manage AWS Logs Transformers using Alchemy Cloud Control.
---


The Transformer resource allows you to manage [AWS Logs Transformers](https://docs.aws.amazon.com/logs/latest/userguide/) and their configuration for processing log data efficiently.

## Minimal Example

This example demonstrates how to create a basic logs transformer with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const logsTransformer = await AWS.Logs.Transformer("basic-logs-transformer", {
  TransformerConfig: [
    {
      type: "json", // Example processor type
      parameters: {
        // Any parameters required for the processor type
      }
    }
  ],
  LogGroupIdentifier: "/aws/lambda/my-function",
  adopt: true // Optional: Adopt existing resource if it exists
});
```

## Advanced Configuration

In this example, we configure a logs transformer with multiple processors for advanced log processing capabilities.

```ts
const advancedLogsTransformer = await AWS.Logs.Transformer("advanced-logs-transformer", {
  TransformerConfig: [
    {
      type: "json",
      parameters: {
        // Parameters for JSON processor
      }
    },
    {
      type: "filter",
      parameters: {
        filterPattern: "{ $.statusCode = 200 }" // Filter to only include successful requests
      }
    }
  ],
  LogGroupIdentifier: "/aws/lambda/my-advanced-function",
  adopt: false // Optional: Do not adopt existing resource
});
```

## Batch Processing Configuration

This example demonstrates how to set up a transformer that processes logs in batches for improved performance.

```ts
const batchLogsTransformer = await AWS.Logs.Transformer("batch-logs-transformer", {
  TransformerConfig: [
    {
      type: "batch",
      parameters: {
        batchSize: 100, // Number of log entries to process per batch
        timeout: 5 // Timeout in seconds for processing a batch
      }
    }
  ],
  LogGroupIdentifier: "/aws/lambda/my-batch-function"
});
```

## Integrating with Other AWS Services

Here’s how to integrate a logs transformer with an S3 bucket for storing processed logs.

```ts
const s3LogsTransformer = await AWS.Logs.Transformer("s3-logs-transformer", {
  TransformerConfig: [
    {
      type: "s3",
      parameters: {
        bucketName: "my-logs-bucket",
        prefix: "processed-logs/"
      }
    }
  ],
  LogGroupIdentifier: "/aws/lambda/my-s3-function",
  adopt: false
});
```
