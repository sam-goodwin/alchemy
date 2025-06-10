---
title: Function
description: Learn how to create, update, and manage AWS CloudFront Functions using Alchemy Cloud Control.
---


The Function resource allows you to create, update, and manage [AWS CloudFront Functions](https://docs.aws.amazon.com/cloudfront/latest/userguide/) for lightweight serverless code execution at the edge.

## Minimal Example

Create a basic CloudFront Function with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const myFunction = await AWS.CloudFront.Function("myFunction", {
  Name: "MyEdgeFunction",
  FunctionCode: "function handler(event) { return event; }",
  FunctionConfig: {
    Comment: "A simple edge function",
    Runtime: "cloudfront-js-1.0"
  },
  AutoPublish: true // Automatically publish the function upon creation
});
```

## Advanced Configuration

Configure a CloudFront Function with metadata and additional settings.

```ts
const advancedFunction = await AWS.CloudFront.Function("advancedFunction", {
  Name: "AdvancedEdgeFunction",
  FunctionCode: "function handler(event) { return event; }",
  FunctionConfig: {
    Comment: "An advanced edge function with custom settings",
    Runtime: "cloudfront-js-1.0",
    MemorySize: 512 // Memory size in MB for the function
  },
  FunctionMetadata: {
    CreatedBy: "user@example.com",
    LastUpdatedBy: "user@example.com"
  },
  AutoPublish: true // Automatically publish the function upon creation
});
```

## Function Adoption

Create a CloudFront Function that adopts an existing resource if it already exists.

```ts
const adoptFunction = await AWS.CloudFront.Function("adoptFunction", {
  Name: "AdoptedEdgeFunction",
  FunctionCode: "function handler(event) { return event; }",
  FunctionConfig: {
    Comment: "This function adopts an existing resource",
    Runtime: "cloudfront-js-1.0"
  },
  adopt: true // Adopt existing resource instead of failing
});
```

## Updating a Function

Update an existing CloudFront Function with new code and configuration.

```ts
const updatedFunction = await AWS.CloudFront.Function("updatedFunction", {
  Name: "UpdatedEdgeFunction",
  FunctionCode: "function handler(event) { /* new logic */ return event; }",
  FunctionConfig: {
    Comment: "Updated edge function logic",
    Runtime: "cloudfront-js-1.0"
  },
  AutoPublish: true // Publish the updated function
});
```
