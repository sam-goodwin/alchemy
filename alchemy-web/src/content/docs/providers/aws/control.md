---
title: AWS Cloud Control API
description: Learn how to use Alchemy's AWS Cloud Control API integration to manage any AWS resource with a unified interface.
---


The AWS Cloud Control API integration in Alchemy provides a unified interface for managing AWS resources using the [AWS Cloud Control API](https://aws.amazon.com/cloudcontrol/). This integration allows you to create, read, update, and delete any AWS resource that is supported by CloudFormation, using a consistent and type-safe interface.

## Installation

First, ensure you have the required peer dependency installed:

```bash
npm install aws4fetch
```

Then, import the AWS Cloud Control module:

```typescript
import AWS from "alchemy/aws/control";
```

## Basic Usage

The AWS Cloud Control integration provides a proxy-based interface that mirrors the AWS service and resource structure. For example, to create an S3 bucket:

```typescript
import AWS from "alchemy/aws/control";

const bucket = await AWS.S3.Bucket("my-bucket", {
  BucketName: "my-unique-bucket-name",
  VersioningConfiguration: {
    Status: "Enabled",
  },
});

console.log(bucket.BucketName); // "my-unique-bucket-name"
```

## Resource Types

All AWS resources that are supported by CloudFormation can be accessed through the AWS namespace. The resource types follow the CloudFormation naming convention:

- `AWS.S3.Bucket` for `AWS::S3::Bucket`
- `AWS.DynamoDB.Table` for `AWS::DynamoDB::Table`
- `AWS.Lambda.Function` for `AWS::Lambda::Function`
- And so on...

## Resource Operations

### Creating Resources

To create a resource, call the resource type function with an ID and configuration:

```typescript
const table = await AWS.DynamoDB.Table("users-table", {
  TableName: "users",
  AttributeDefinitions: [
    {
      AttributeName: "id",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "id",
      KeyType: "HASH",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
});
```

### Updating Resources

To update a resource, call the resource type function with the same ID and new configuration:

```typescript
const updatedBucket = await AWS.S3.Bucket("my-bucket", {
  BucketName: "my-unique-bucket-name",
  VersioningConfiguration: {
    Status: "Suspended", // Change versioning status
  },
});
```

### Deleting Resources

Resources are automatically deleted when they go out of scope or when the `destroy()` function is called:

```typescript
import { destroy } from "alchemy/destroy";

// Delete all resources in the scope
await destroy(scope);
```

## Advanced Usage

### Cross-Resource References

You can reference attributes from one resource in another:

```typescript
// Create an IAM role for Lambda
const role = await AWS.IAM.Role("lambda-role", {
  RoleName: "my-lambda-role",
  AssumeRolePolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "lambda.amazonaws.com",
        },
        Action: "sts:AssumeRole",
      },
    ],
  },
});

// Create a Lambda function using the role
const func = await AWS.Lambda.Function("my-function", {
  FunctionName: "my-function",
  Role: role.Arn, // Reference the role's ARN
  Code: {
    ZipFile: "exports.handler = async () => ({ statusCode: 200 });",
  },
  Handler: "index.handler",
  Runtime: "nodejs20.x",
});
```

### Error Handling

The Cloud Control API client includes comprehensive error handling:

```typescript
try {
  const bucket = await AWS.S3.Bucket("my-bucket", {
    BucketName: "invalid/name", // Invalid bucket name
  });
} catch (error) {
  if (error.code === "ValidationException") {
    console.error("Invalid resource configuration:", error.message);
  } else if (error.retryable) {
    console.error("Transient error, retry the operation:", error.message);
  } else {
    console.error("Unexpected error:", error);
  }
}
```

### Configuration Options

You can configure the Cloud Control API client behavior:

```typescript
import { createCloudControlClient } from "alchemy/aws/control/client";

const client = createCloudControlClient({
  region: "us-west-2", // AWS region
  maxPollingAttempts: 60, // Maximum attempts for polling operations
  initialPollingDelay: 2000, // Initial delay between polling attempts (ms)
  maxPollingDelay: 20000, // Maximum delay between polling attempts (ms)
  operationTimeout: 600000, // Overall operation timeout (ms)
  maxRetries: 5, // Maximum retries for retryable errors
});
```

## Limitations and Known Issues

1. Resource Updates
   - Not all resource properties can be updated after creation
   - Some updates may require resource replacement
   - Check the [CloudFormation resource documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html) for updateable properties

2. Operation Timing
   - Resource creation and updates are asynchronous
   - Operations may take several minutes to complete
   - The client includes built-in polling with exponential backoff

3. API Limits
   - Cloud Control API has service quotas and throttling limits
   - The client includes automatic retries for throttling errors
   - Consider implementing your own rate limiting for large-scale operations

## Examples

### Complete S3 Static Website

```typescript
import AWS from "alchemy/aws/control";
import { alchemy } from "alchemy";

const app = alchemy.app(import.meta);

// Create a bucket for static website hosting
const bucket = await AWS.S3.Bucket("website", {
  BucketName: "my-static-website",
  WebsiteConfiguration: {
    IndexDocument: "index.html",
    ErrorDocument: "error.html",
  },
  PublicAccessBlockConfiguration: {
    BlockPublicAcls: false,
    BlockPublicPolicy: false,
    IgnorePublicAcls: false,
    RestrictPublicBuckets: false,
  },
});

// Add bucket policy for public read access
const policy = await AWS.S3.BucketPolicy("website-policy", {
  Bucket: bucket.BucketName,
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: `${bucket.Arn}/*`,
      },
    ],
  },
});

console.log("Website URL:", `http://${bucket.BucketName}.s3-website-${app.region}.amazonaws.com`);
```

### DynamoDB Table with GSI

```typescript
import AWS from "alchemy/aws/control";

const table = await AWS.DynamoDB.Table("users", {
  TableName: "users",
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" },
    { AttributeName: "email", AttributeType: "S" },
    { AttributeName: "createdAt", AttributeType: "N" },
  ],
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: "email-index",
      KeySchema: [
        { AttributeName: "email", KeyType: "HASH" },
      ],
      Projection: { ProjectionType: "ALL" },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    },
    {
      IndexName: "createdAt-index",
      KeySchema: [
        { AttributeName: "createdAt", KeyType: "HASH" },
      ],
      Projection: { ProjectionType: "KEYS_ONLY" },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  StreamSpecification: {
    StreamEnabled: true,
    StreamViewType: "NEW_AND_OLD_IMAGES",
  },
});

console.log("Table Stream ARN:", table.StreamArn);
```

### Lambda Function with CloudWatch Logs

```typescript
import AWS from "alchemy/aws/control";

// Create IAM role for Lambda
const role = await AWS.IAM.Role("lambda-role", {
  RoleName: "my-lambda-role",
  AssumeRolePolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "lambda.amazonaws.com",
        },
        Action: "sts:AssumeRole",
      },
    ],
  },
  ManagedPolicyArns: [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
  ],
});

// Create CloudWatch log group
const logGroup = await AWS.Logs.LogGroup("lambda-logs", {
  LogGroupName: "/aws/lambda/my-function",
  RetentionInDays: 14,
});

// Create Lambda function
const func = await AWS.Lambda.Function("my-function", {
  FunctionName: "my-function",
  Role: role.Arn,
  Code: {
    ZipFile: `
exports.handler = async (event) => {
  console.log("Event:", JSON.stringify(event));
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Lambda!" }),
  };
};
    `,
  },
  Handler: "index.handler",
  Runtime: "nodejs20.x",
  Environment: {
    Variables: {
      LOG_LEVEL: "INFO",
    },
  },
  TracingConfig: {
    Mode: "Active", // Enable X-Ray tracing
  },
});

console.log("Function ARN:", func.FunctionArn);
```

## Troubleshooting

### Common Issues

1. Resource Creation Failures
   ```typescript
   try {
     const bucket = await AWS.S3.Bucket("my-bucket", config);
   } catch (error) {
     if (error.code === "ResourceConflict") {
       console.error("Resource already exists");
     } else if (error.code === "ValidationException") {
       console.error("Invalid configuration:", error.message);
     } else if (error.code === "AccessDeniedException") {
       console.error("Check IAM permissions");
     }
   }
   ```

2. Operation Timeouts
   ```typescript
   const client = createCloudControlClient({
     maxPollingAttempts: 60, // Increase for slow operations
     operationTimeout: 900000, // 15 minutes
   });
   ```

3. Rate Limiting
   ```typescript
   // Implement your own rate limiting
   const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
   
   for (const config of resourceConfigs) {
     await delay(1000); // Wait 1 second between operations
     await AWS.S3.Bucket(`bucket-${config.id}`, config);
   }
   ```

### Best Practices

1. Always use proper error handling
2. Implement retries with exponential backoff
3. Use resource IDs that are unique within your scope
4. Clean up resources after tests
5. Monitor operation progress and timeouts
6. Use TypeScript for better type safety
7. Keep resource configurations modular and reusable

## Additional Resources

- [AWS Cloud Control API Documentation](https://docs.aws.amazon.com/cloudcontrolapi/latest/userguide/what-is-cloudcontrolapi.html)
- [CloudFormation Resource Types](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)
- [AWS Service Quotas](https://docs.aws.amazon.com/cloudcontrolapi/latest/userguide/resource-quotas.html) 
