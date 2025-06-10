---
title: ScheduledQuery
description: Learn how to create, update, and manage AWS Timestream ScheduledQuerys using Alchemy Cloud Control.
---


The ScheduledQuery resource allows you to create and manage scheduled queries in Amazon Timestream, enabling efficient data analysis at regular intervals. For more details, refer to the [AWS Timestream ScheduledQuerys documentation](https://docs.aws.amazon.com/timestream/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic scheduled query with the required properties and a couple of common optional ones.

```ts
import AWS from "alchemy/aws/control";

const scheduledQuery = await AWS.Timestream.ScheduledQuery("myScheduledQuery", {
  ScheduledQueryExecutionRoleArn: "arn:aws:iam::123456789012:role/TimestreamQueryRole",
  ErrorReportConfiguration: {
    S3Configuration: {
      BucketName: "my-error-reports-bucket",
      ObjectKeyPrefix: "error-reports/"
    }
  },
  ScheduleConfiguration: {
    ScheduleExpression: "rate(5 minutes)"
  },
  QueryString: "SELECT * FROM my_table WHERE measure_name = 'temperature'",
  NotificationConfiguration: {
    SnsConfiguration: {
      TopicArn: "arn:aws:sns:us-west-2:123456789012:my-topic"
    }
  }
});
```

## Advanced Configuration

In this example, we configure a scheduled query with additional advanced options such as a target configuration and KMS key for encryption.

```ts
const advancedScheduledQuery = await AWS.Timestream.ScheduledQuery("advancedScheduledQuery", {
  ScheduledQueryExecutionRoleArn: "arn:aws:iam::123456789012:role/TimestreamQueryRole",
  ErrorReportConfiguration: {
    S3Configuration: {
      BucketName: "my-error-reports-bucket",
      ObjectKeyPrefix: "error-reports/"
    }
  },
  ScheduleConfiguration: {
    ScheduleExpression: "cron(0 12 * * ? *)" // Runs daily at noon UTC
  },
  QueryString: "SELECT AVG(temperature) FROM my_table WHERE measure_name = 'temperature'",
  NotificationConfiguration: {
    SnsConfiguration: {
      TopicArn: "arn:aws:sns:us-west-2:123456789012:my-topic"
    }
  },
  TargetConfiguration: {
    TimestreamConfiguration: {
      DatabaseName: "my_database",
      TableName: "my_table"
    }
  },
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-kms-key"
});
```

## Using Client Token

This example shows how to create a scheduled query with a client token, ensuring idempotency during resource creation.

```ts
const idempotentScheduledQuery = await AWS.Timestream.ScheduledQuery("idempotentScheduledQuery", {
  ScheduledQueryExecutionRoleArn: "arn:aws:iam::123456789012:role/TimestreamQueryRole",
  ErrorReportConfiguration: {
    S3Configuration: {
      BucketName: "my-error-reports-bucket",
      ObjectKeyPrefix: "error-reports/"
    }
  },
  ScheduleConfiguration: {
    ScheduleExpression: "rate(1 hour)"
  },
  QueryString: "SELECT COUNT(*) FROM my_table",
  NotificationConfiguration: {
    SnsConfiguration: {
      TopicArn: "arn:aws:sns:us-west-2:123456789012:my-topic"
    }
  },
  ClientToken: "unique-client-token-123456"
});
```
