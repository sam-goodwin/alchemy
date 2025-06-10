---
title: ApplicationOutput
description: Learn how to create, update, and manage AWS KinesisAnalyticsV2 ApplicationOutputs using Alchemy Cloud Control.
---


The ApplicationOutput resource allows you to manage [AWS KinesisAnalyticsV2 ApplicationOutputs](https://docs.aws.amazon.com/kinesisanalyticsv2/latest/userguide/) for your streaming data applications. This resource is essential for defining how your application will output processed data to various destinations.

## Minimal Example

Create a basic Kinesis Analytics V2 ApplicationOutput with required properties:

```ts
import AWS from "alchemy/aws/control";

const applicationOutput = await AWS.KinesisAnalyticsV2.ApplicationOutput("basicOutput", {
  ApplicationName: "MyKinesisApp",
  Output: {
    Name: "MyOutputStream",
    DestinationSchema: {
      RecordFormatType: "JSON"
    },
    KinesisStreamingDestination: {
      ResourceArn: "arn:aws:kinesis:us-west-2:123456789012:stream/MyOutputStream",
      RoleArn: "arn:aws:iam::123456789012:role/MyKinesisRole"
    }
  }
});
```

## Advanced Configuration

Configure an ApplicationOutput with additional properties such as adopting an existing resource:

```ts
const advancedOutput = await AWS.KinesisAnalyticsV2.ApplicationOutput("advancedOutput", {
  ApplicationName: "MyKinesisApp",
  Output: {
    Name: "MyAdvancedOutput",
    DestinationSchema: {
      RecordFormatType: "JSON"
    },
    KinesisStreamingDestination: {
      ResourceArn: "arn:aws:kinesis:us-west-2:123456789012:stream/MyAdvancedOutputStream",
      RoleArn: "arn:aws:iam::123456789012:role/MyKinesisRole"
    }
  },
  adopt: true // Adopt existing resource if it already exists
});
```

## Output to Multiple Destinations

Demonstrate how to set up multiple outputs for a Kinesis Analytics application:

```ts
const multipleOutputs = await AWS.KinesisAnalyticsV2.ApplicationOutput("multipleOutputs", {
  ApplicationName: "MyKinesisApp",
  Output: [
    {
      Name: "OutputToStream",
      DestinationSchema: {
        RecordFormatType: "JSON"
      },
      KinesisStreamingDestination: {
        ResourceArn: "arn:aws:kinesis:us-west-2:123456789012:stream/MyOutputStream",
        RoleArn: "arn:aws:iam::123456789012:role/MyKinesisRole"
      }
    },
    {
      Name: "OutputToS3",
      DestinationSchema: {
        RecordFormatType: "CSV"
      },
      S3Destination: {
        BucketArn: "arn:aws:s3:::my-output-bucket",
        RoleArn: "arn:aws:iam::123456789012:role/MyKinesisRole",
        Prefix: "output/"
      }
    }
  ]
});
```

By utilizing the `ApplicationOutput` resource, you can effectively manage how your Kinesis Analytics applications output data to various destinations, enhancing your data processing workflows.
