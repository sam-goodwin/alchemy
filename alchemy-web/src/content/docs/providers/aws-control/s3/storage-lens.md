---
title: StorageLens
description: Learn how to create, update, and manage AWS S3 StorageLenss using Alchemy Cloud Control.
---


The StorageLens resource allows you to manage [AWS S3 StorageLens](https://docs.aws.amazon.com/s3/latest/userguide/) configurations for enhanced visibility into your S3 storage usage and activity.

## Minimal Example

Create a basic StorageLens configuration with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicStorageLens = await AWS.S3.StorageLens("basicStorageLens", {
  StorageLensConfiguration: {
    Id: "basic-s3-storage-lens",
    IsEnabled: true,
    StorageLensConfiguration: {
      DataExport: {
        S3BucketDestination: {
          Format: "CSV",
          AccountId: "123456789012",
          Bucket: "arn:aws:s3:::my-storage-lens-bucket",
          Prefix: "storage-lens-data/",
          OutputSchema: "Redacted"
        },
        Metrics: {
          IsEnabled: true,
          Metrics: [
            {
              MetricName: "AllObjects",
              IsEnabled: true
            }
          ]
        }
      },
      Include: {
        Buckets: [
          {
            BucketName: "my-example-bucket"
          }
        ]
      }
    }
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a StorageLens with more advanced options, such as detailed metrics and additional filters.

```ts
const advancedStorageLens = await AWS.S3.StorageLens("advancedStorageLens", {
  StorageLensConfiguration: {
    Id: "advanced-s3-storage-lens",
    IsEnabled: true,
    StorageLensConfiguration: {
      DataExport: {
        S3BucketDestination: {
          Format: "Parquet",
          AccountId: "123456789012",
          Bucket: "arn:aws:s3:::another-storage-lens-bucket",
          Prefix: "detailed-storage-lens-data/",
          OutputSchema: "Complete"
        },
        Metrics: {
          IsEnabled: true,
          Metrics: [
            {
              MetricName: "AllObjects",
              IsEnabled: true
            },
            {
              MetricName: "StorageBytes",
              IsEnabled: true
            }
          ]
        }
      },
      Include: {
        Buckets: [
          {
            BucketName: "my-advanced-bucket"
          }
        ],
        Regions: ["us-east-1", "us-west-2"]
      },
      Exclude: {
        Buckets: [
          {
            BucketName: "my-archive-bucket"
          }
        ]
      }
    }
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Staging"
    },
    {
      Key: "Department",
      Value: "Finance"
    }
  ]
});
```

## Data Export Configuration

Demonstrate how to set up a StorageLens with specific data export configurations.

```ts
const exportStorageLens = await AWS.S3.StorageLens("exportStorageLens", {
  StorageLensConfiguration: {
    Id: "export-s3-storage-lens",
    IsEnabled: true,
    StorageLensConfiguration: {
      DataExport: {
        S3BucketDestination: {
          Format: "CSV",
          AccountId: "123456789012",
          Bucket: "arn:aws:s3:::export-storage-lens-bucket",
          Prefix: "export-data/",
          OutputSchema: "Complete"
        },
        Metrics: {
          IsEnabled: true,
          Metrics: [
            {
              MetricName: "AllObjects",
              IsEnabled: true
            },
            {
              MetricName: "DataBytes",
              IsEnabled: true
            }
          ]
        }
      },
      Include: {
        Buckets: [
          {
            BucketName: "my-data-bucket"
          }
        ]
      }
    }
  },
  Tags: [
    {
      Key: "Purpose",
      Value: "Data Analysis"
    }
  ]
});
```
