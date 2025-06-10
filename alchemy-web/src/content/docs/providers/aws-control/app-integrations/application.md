---
title: Application
description: Learn how to create, update, and manage AWS AppIntegrations Applications using Alchemy Cloud Control.
---


The Application resource lets you manage [AWS AppIntegrations Applications](https://docs.aws.amazon.com/appintegrations/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic application with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicApplication = await AWS.AppIntegrations.Application("basicApp", {
  ApplicationSourceConfig: {
    // Sample configuration for an application source
    SourceType: "S3",
    SourceProperties: {
      BucketName: "my-app-bucket",
      Key: "config.json"
    }
  },
  Description: "My basic application for integration.",
  Namespace: "myAppNamespace",
  Name: "MyApp",
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure an application with detailed permissions and multiple tags for better resource management.

```ts
const advancedApplication = await AWS.AppIntegrations.Application("advancedApp", {
  ApplicationSourceConfig: {
    SourceType: "DynamoDB",
    SourceProperties: {
      TableName: "my-app-table",
      Region: "us-west-2"
    }
  },
  Description: "An advanced application with extensive configurations.",
  Namespace: "advancedAppNamespace",
  Name: "AdvancedApp",
  Permissions: [
    "arn:aws:iam::123456789012:policy/MyAppPolicy",
    "arn:aws:iam::123456789012:policy/AnotherPolicy"
  ],
  Tags: [
    { Key: "Project", Value: "AppIntegrations" },
    { Key: "Owner", Value: "TeamA" }
  ]
});
```

## Using Application with Permissions

This example demonstrates how to set specific permissions for the application.

```ts
const permissionedApplication = await AWS.AppIntegrations.Application("permissionedApp", {
  ApplicationSourceConfig: {
    SourceType: "Kinesis",
    SourceProperties: {
      StreamName: "my-stream",
      Region: "us-east-1"
    }
  },
  Description: "Application with specific IAM permissions.",
  Namespace: "permissionedAppNamespace",
  Name: "PermissionedApp",
  Permissions: [
    JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: [
            "kinesis:DescribeStream",
            "kinesis:GetRecords"
          ],
          Resource: "arn:aws:kinesis:us-east-1:123456789012:stream/my-stream"
        }
      ]
    })
  ]
});
```

## Application with Multiple Sources

This example shows how to create an application that integrates with multiple sources.

```ts
const multiSourceApplication = await AWS.AppIntegrations.Application("multiSourceApp", {
  ApplicationSourceConfig: {
    SourceType: "API",
    SourceProperties: {
      ApiEndpoint: "https://api.example.com/data",
      Authentication: {
        Type: "OAuth2",
        Token: "my-oauth-token"
      }
    }
  },
  Description: "Application integrating with multiple data sources.",
  Namespace: "multiSourceAppNamespace",
  Name: "MultiSourceApp",
  Tags: [
    { Key: "Integration", Value: "MultipleSources" }
  ]
});
```
