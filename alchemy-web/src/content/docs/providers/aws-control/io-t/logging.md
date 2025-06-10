---
title: Logging
description: Learn how to create, update, and manage AWS IoT Loggings using Alchemy Cloud Control.
---


The Logging resource lets you manage [AWS IoT Loggings](https://docs.aws.amazon.com/iot/latest/userguide/) for your IoT accounts, allowing you to configure logging levels and track events within your IoT applications.

## Minimal Example

Create a basic Logging configuration with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const loggingConfig = await AWS.IoT.Logging("basicLoggingConfig", {
  AccountId: "123456789012", // Your AWS Account ID
  RoleArn: "arn:aws:iam::123456789012:role/service-role/MyIoTRole", // IAM Role ARN
  DefaultLogLevel: "INFO", // Default log level
  adopt: true // Optional: Adopt existing resource instead of failing
});
```

## Advanced Configuration

Configure Logging with a different log level and explore additional properties.

```ts
const advancedLoggingConfig = await AWS.IoT.Logging("advancedLoggingConfig", {
  AccountId: "123456789012",
  RoleArn: "arn:aws:iam::123456789012:role/service-role/MyIoTRole",
  DefaultLogLevel: "ERROR", // Set to ERROR to capture only error logs
  adopt: false // Optional: Do not adopt existing resource
});
```

## Resource Adoption Example

Adopt an existing Logging resource while keeping the current settings intact.

```ts
const adoptedLoggingConfig = await AWS.IoT.Logging("adoptedLoggingConfig", {
  AccountId: "123456789012",
  RoleArn: "arn:aws:iam::123456789012:role/service-role/MyIoTRole",
  DefaultLogLevel: "DEBUG", // Set to DEBUG for detailed logs
  adopt: true // Enable adoption of the existing resource
});
```

## Example with Logging Role

Create a Logging configuration and specify a role that allows logging to a specific S3 bucket.

```ts
const loggingWithRole = await AWS.IoT.Logging("loggingWithRole", {
  AccountId: "123456789012",
  RoleArn: "arn:aws:iam::123456789012:role/service-role/MyIoTRole",
  DefaultLogLevel: "INFO",
  adopt: false // Regular creation, no adoption
});

// Example IAM policy for logging role
const loggingPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: [
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      Resource: "arn:aws:s3:::my-logs-bucket/*"
    }
  ]
};

// Attach the policy to the role if necessary
```
