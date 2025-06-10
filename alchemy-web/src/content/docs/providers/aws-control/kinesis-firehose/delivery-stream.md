---
title: DeliveryStream
description: Learn how to create, update, and manage AWS KinesisFirehose DeliveryStreams using Alchemy Cloud Control.
---


The DeliveryStream resource allows you to create and configure [AWS KinesisFirehose DeliveryStreams](https://docs.aws.amazon.com/kinesisfirehose/latest/userguide/) for streaming data to various destinations.

## Minimal Example

Create a basic KinesisFirehose delivery stream with standard S3 destination configuration.

```ts
import AWS from "alchemy/aws/control";

const deliveryStream = await AWS.KinesisFirehose.DeliveryStream("basicDeliveryStream", {
  DeliveryStreamName: "myDataStream",
  DeliveryStreamType: "DirectPut",
  S3DestinationConfiguration: {
    BucketARN: "arn:aws:s3:::my-data-bucket",
    RoleARN: "arn:aws:iam::123456789012:role/firehose_delivery_role",
    Prefix: "data/",
    BufferingHints: {
      SizeInMBs: 5,
      IntervalInSeconds: 300
    }
  }
});
```

## Advanced Configuration

Configure a delivery stream with a Redshift destination and additional settings for buffering and compression.

```ts
const advancedDeliveryStream = await AWS.KinesisFirehose.DeliveryStream("advancedDeliveryStream", {
  DeliveryStreamName: "myAdvancedDataStream",
  DeliveryStreamType: "Redshift",
  RedshiftDestinationConfiguration: {
    ClusterJDBCURL: "jdbc:redshift://redshift-cluster-1.abc123xyz456.us-west-2.redshift.amazonaws.com:5439/mydatabase",
    RoleARN: "arn:aws:iam::123456789012:role/firehose_delivery_role",
    Username: "myRedshiftUser",
    Password: alchemy.secret(process.env.REDSHIFT_PASSWORD!),
    Database: "mydatabase",
    Table: "my_table",
    CopyCommand: {
      DataFormat: "JSON",
      CopyOptions: "json 'auto'"
    },
    BufferingHints: {
      SizeInMBs: 10,
      IntervalInSeconds: 600
    }
  }
});
```

## Elasticsearch Destination

Create a delivery stream that sends data to an Amazon Elasticsearch Service (OpenSearch) destination with specific index settings.

```ts
const esDeliveryStream = await AWS.KinesisFirehose.DeliveryStream("esDeliveryStream", {
  DeliveryStreamName: "myESDataStream",
  DeliveryStreamType: "Elasticsearch",
  ElasticsearchDestinationConfiguration: {
    DomainARN: "arn:aws:es:us-west-2:123456789012:domain/my-elasticsearch-domain",
    RoleARN: "arn:aws:iam::123456789012:role/firehose_delivery_role",
    IndexName: "my-index",
    TypeName: "_doc",
    IndexRotationPeriod: "OneHour",
    BufferingHints: {
      SizeInMBs: 5,
      IntervalInSeconds: 300
    },
    RetryOptions: {
      DurationInSeconds: 300
    }
  }
});
```

## Splunk Destination

Configure a delivery stream to send data to a Splunk HTTP Event Collector endpoint.

```ts
const splunkDeliveryStream = await AWS.KinesisFirehose.DeliveryStream("splunkDeliveryStream", {
  DeliveryStreamName: "mySplunkDataStream",
  DeliveryStreamType: "Splunk",
  SplunkDestinationConfiguration: {
    HECEndpoint: "https://splunk-server:8088",
    HECToken: alchemy.secret(process.env.SPLUNK_HEC_TOKEN!),
    Index: "main",
    Source: "myApp",
    SourceType: "_json",
    S3BackupMode: "AllEvents",
    S3DestinationConfiguration: {
      BucketARN: "arn:aws:s3:::my-splunk-backup",
      RoleARN: "arn:aws:iam::123456789012:role/firehose_delivery_role",
      Prefix: "backup/",
      BufferingHints: {
        SizeInMBs: 5,
        IntervalInSeconds: 300
      }
    }
  }
});
```
