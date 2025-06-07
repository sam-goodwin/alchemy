---
title: Managing AWS Lambda Functions with Alchemy
description: Learn how to create, update, and manage AWS Lambda Functions using Alchemy Cloud Control.
---

# Function

The Function resource lets you manage [AWS Lambda Functions](https://docs.aws.amazon.com/lambda/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic AWS Lambda function with required properties and a few optional ones:

```ts
import AWS from "alchemy/aws/control";

const MyLambdaFunction = await AWS.Lambda.Function("MyFunction", {
  Code: {
    ZipFile: "exports.handler = async (event) => { return 'Hello from Lambda!'; };"
  },
  Handler: "index.handler",
  Role: "arn:aws:iam::123456789012:role/service-role/MyLambdaRole",
  Runtime: "nodejs14.x",
  MemorySize: 128,
  Timeout: 3
});
```

## Advanced Configuration

Configure a Lambda function with additional settings such as VPC configuration and environment variables:

```ts
const AdvancedLambdaFunction = await AWS.Lambda.Function("AdvancedFunction", {
  Code: {
    ZipFile: "exports.handler = async (event) => { return 'Advanced Function!'; };"
  },
  Handler: "index.handler",
  Role: "arn:aws:iam::123456789012:role/service-role/MyLambdaRole",
  Runtime: "nodejs14.x",
  MemorySize: 256,
  Timeout: 5,
  VpcConfig: {
    SecurityGroupIds: ["sg-0123456789abcdef0"],
    SubnetIds: ["subnet-0123456789abcdef0", "subnet-0123456789abcdef1"]
  },
  Environment: {
    Variables: {
      STAGE: "production",
      DB_CONNECTION: "jdbc:mysql://mydb.example.com:3306/mydatabase"
    }
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Using Layers

Demonstrate how to include Lambda layers for additional functionality:

```ts
const LayeredLambdaFunction = await AWS.Lambda.Function("LayeredFunction", {
  Code: {
    ZipFile: "exports.handler = async (event) => { return 'Function with Layers!'; };"
  },
  Handler: "index.handler",
  Role: "arn:aws:iam::123456789012:role/service-role/MyLambdaRole",
  Runtime: "nodejs14.x",
  Layers: [
    "arn:aws:lambda:us-east-1:123456789012:layer:MyLayer:1"
  ],
  MemorySize: 128,
  Timeout: 3
});
```

## Setting Up Dead Letter Queues

Configure a dead letter queue (DLQ) for error handling:

```ts
const DLQLambdaFunction = await AWS.Lambda.Function("DLQFunction", {
  Code: {
    ZipFile: "exports.handler = async (event) => { throw new Error('Error!'); };"
  },
  Handler: "index.handler",
  Role: "arn:aws:iam::123456789012:role/service-role/MyLambdaRole",
  Runtime: "nodejs14.x",
  DeadLetterConfig: {
    TargetArn: "arn:aws:sqs:us-east-1:123456789012:MyDeadLetterQueue"
  },
  MemorySize: 128,
  Timeout: 3
});
```