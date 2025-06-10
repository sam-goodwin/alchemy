---
title: ApplicationOutput
description: Learn how to create, update, and manage AWS KinesisAnalytics ApplicationOutputs using Alchemy Cloud Control.
---


The ApplicationOutput resource lets you manage [AWS KinesisAnalytics ApplicationOutputs](https://docs.aws.amazon.com/kinesisanalytics/latest/userguide/) that are used to define how the results of your application are sent to destinations such as Kinesis streams or Amazon S3.

## Minimal Example

Create a basic ApplicationOutput with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const basicOutput = await AWS.KinesisAnalytics.ApplicationOutput("basicOutput", {
  ApplicationName: "MyKinesisApp",
  Output: {
    Name: "MainOutput",
    KinesisStream: {
      ResourceArn: "arn:aws:kinesis:us-west-2:123456789012:stream/MyKinesisStream",
      RoleArn: "arn:aws:iam::123456789012:role/service-role/MyKinesisRole"
    }
  },
  adopt: true // Optional: adopt existing resource instead of failing
});
```

## Advanced Configuration

Configure an ApplicationOutput with additional settings including S3 output:

```ts
const advancedOutput = await AWS.KinesisAnalytics.ApplicationOutput("advancedOutput", {
  ApplicationName: "MyKinesisApp",
  Output: {
    Name: "AdvancedOutput",
    S3: {
      ResourceArn: "arn:aws:s3:::my-output-bucket",
      RoleArn: "arn:aws:iam::123456789012:role/service-role/MyS3Role",
      BufferingHints: {
        SizeInMB: 5, // Buffer size before sending to S3
        IntervalInSeconds: 300 // Buffering interval
      }
    }
  }
});
```

## S3 Output with Compression

Define an ApplicationOutput that sends data to S3 with Gzip compression enabled:

```ts
const s3CompressedOutput = await AWS.KinesisAnalytics.ApplicationOutput("s3CompressedOutput", {
  ApplicationName: "MyKinesisApp",
  Output: {
    Name: "CompressedOutput",
    S3: {
      ResourceArn: "arn:aws:s3:::my-compressed-output-bucket",
      RoleArn: "arn:aws:iam::123456789012:role/service-role/MyS3Role",
      CompressionType: "GZIP", // Enable Gzip compression
      BufferingHints: {
        SizeInMB: 10,
        IntervalInSeconds: 60
      }
    }
  }
});
```

## Kinesis Stream Output with IAM Role

Set up an ApplicationOutput that sends data to a Kinesis Stream with the appropriate IAM role:

```ts
const kinesisStreamOutput = await AWS.KinesisAnalytics.ApplicationOutput("kinesisStreamOutput", {
  ApplicationName: "MyKinesisApp",
  Output: {
    Name: "KinesisStreamOutput",
    KinesisStream: {
      ResourceArn: "arn:aws:kinesis:us-west-2:123456789012:stream/MyOutputStream",
      RoleArn: "arn:aws:iam::123456789012:role/service-role/MyKinesisRole"
    }
  }
});
```
