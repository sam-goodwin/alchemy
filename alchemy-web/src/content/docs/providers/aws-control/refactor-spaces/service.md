---
title: Service
description: Learn how to create, update, and manage AWS RefactorSpaces Services using Alchemy Cloud Control.
---


The Service resource allows you to create and manage [AWS RefactorSpaces Services](https://docs.aws.amazon.com/refactorspaces/latest/userguide/) that facilitate the migration of applications to microservices. This resource integrates with AWS Lambda and HTTP endpoints for seamless application management.

## Minimal Example

Create a basic RefactorSpaces Service with essential properties.

```ts
import AWS from "alchemy/aws/control";

const refactorService = await AWS.RefactorSpaces.Service("myRefactorService", {
  name: "MyRefactorService",
  environmentIdentifier: "env-123456",
  applicationIdentifier: "app-123456",
  endpointType: "Lambda",
  lambdaEndpoint: {
    functionArn: "arn:aws:lambda:us-west-2:123456789012:function:my-function",
    payloadFormatVersion: "2.0"
  }
});
```

## Advanced Configuration

Configure a RefactorSpaces Service with additional options, including a description and VPC settings.

```ts
const advancedRefactorService = await AWS.RefactorSpaces.Service("advancedRefactorService", {
  name: "AdvancedRefactorService",
  environmentIdentifier: "env-123456",
  applicationIdentifier: "app-123456",
  endpointType: "Url",
  urlEndpoint: {
    url: "https://api.myservice.com",
    healthUrl: "https://api.myservice.com/health"
  },
  description: "This service handles advanced operations for my application.",
  vpcId: "vpc-0a1b2c3d4e5f6g7h8",
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Team", value: "DevOps" }
  ]
});
```

## Using Custom VPC

Create a service that runs within a specific VPC for better network security.

```ts
const vpcService = await AWS.RefactorSpaces.Service("vpcService", {
  name: "VpcService",
  environmentIdentifier: "env-123456",
  applicationIdentifier: "app-123456",
  endpointType: "Lambda",
  lambdaEndpoint: {
    functionArn: "arn:aws:lambda:us-west-2:123456789012:function:my-secure-function",
    payloadFormatVersion: "2.0"
  },
  vpcId: "vpc-0a1b2c3d4e5f6g7h8"
});
```

## Tagging Resources

Create a service with specific tags for better resource management and organization.

```ts
const taggedService = await AWS.RefactorSpaces.Service("taggedService", {
  name: "TaggedRefactorService",
  environmentIdentifier: "env-123456",
  applicationIdentifier: "app-123456",
  endpointType: "Url",
  urlEndpoint: {
    url: "https://api.taggedservice.com",
    healthUrl: "https://api.taggedservice.com/health"
  },
  tags: [
    { key: "Purpose", value: "Testing" },
    { key: "Owner", value: "TeamA" }
  ]
});
```
