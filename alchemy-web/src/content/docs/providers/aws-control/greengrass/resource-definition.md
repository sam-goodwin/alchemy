---
title: ResourceDefinition
description: Learn how to create, update, and manage AWS Greengrass ResourceDefinitions using Alchemy Cloud Control.
---


The ResourceDefinition resource allows you to manage [AWS Greengrass ResourceDefinitions](https://docs.aws.amazon.com/greengrass/latest/userguide/) which define the resources that your Greengrass group can access.

## Minimal Example

This example demonstrates how to create a basic ResourceDefinition with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const resourceDefinition = await AWS.Greengrass.ResourceDefinition("myResourceDefinition", {
  Name: "MyResourceDefinition",
  InitialVersion: {
    Resources: {
      MyS3Bucket: {
        Id: "MyS3Bucket",
        Type: "S3",
        ResourceDataContainer: {
          S3Data: {
            BucketARN: "arn:aws:s3:::my-bucket",
            ETag: "etag-value",
            Key: "my-data-file.txt"
          }
        }
      }
    }
  },
  Tags: {
    Environment: "Development"
  }
});
```

## Advanced Configuration

In this example, we configure a ResourceDefinition with multiple resource types and additional tags.

```ts
const advancedResourceDefinition = await AWS.Greengrass.ResourceDefinition("advancedResourceDefinition", {
  Name: "AdvancedResourceDefinition",
  InitialVersion: {
    Resources: {
      MyDynamoDBTable: {
        Id: "MyDynamoDBTable",
        Type: "DynamoDB",
        ResourceDataContainer: {
          DynamoDB: {
            TableARN: "arn:aws:dynamodb:us-west-2:123456789012:table/MyTable",
            RoleARN: "arn:aws:iam::123456789012:role/MyGreengrassRole"
          }
        }
      },
      MyS3Bucket: {
        Id: "MyS3Bucket",
        Type: "S3",
        ResourceDataContainer: {
          S3Data: {
            BucketARN: "arn:aws:s3:::my-bucket",
            ETag: "etag-value",
            Key: "my-data-file.txt"
          }
        }
      }
    }
  },
  Tags: {
    Environment: "Production",
    Project: "IoTApp"
  }
});
```

## Resource with Adoption

This example shows how to create a ResourceDefinition with the adoption property set to true, allowing you to adopt an existing resource.

```ts
const adoptedResourceDefinition = await AWS.Greengrass.ResourceDefinition("adoptedResourceDefinition", {
  Name: "AdoptedResourceDefinition",
  InitialVersion: {
    Resources: {
      MyS3Bucket: {
        Id: "MyS3Bucket",
        Type: "S3",
        ResourceDataContainer: {
          S3Data: {
            BucketARN: "arn:aws:s3:::existing-bucket",
            ETag: "etag-value",
            Key: "existing-data-file.txt"
          }
        }
      }
    }
  },
  adopt: true
});
```
