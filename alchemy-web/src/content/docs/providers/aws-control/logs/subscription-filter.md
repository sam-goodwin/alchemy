---
title: SubscriptionFilter
description: Learn how to create, update, and manage AWS Logs SubscriptionFilters using Alchemy Cloud Control.
---


The SubscriptionFilter resource allows you to manage [AWS Logs SubscriptionFilters](https://docs.aws.amazon.com/logs/latest/userguide/) for streaming log data to various destinations such as Amazon Kinesis or Lambda functions.

## Minimal Example

Create a basic subscription filter to stream logs from a log group to a specified destination.

```ts
import AWS from "alchemy/aws/control";

const minimalSubscriptionFilter = await AWS.Logs.SubscriptionFilter("basicFilter", {
  FilterPattern: "[host, ident, auth, timestamp, request]",
  LogGroupName: "my-log-group",
  DestinationArn: "arn:aws:lambda:us-west-2:123456789012:function:myLambdaFunction",
  ApplyOnTransformedLogs: true
});
```

## Advanced Configuration

Configure a subscription filter with advanced options like custom filter name and distribution method.

```ts
const advancedSubscriptionFilter = await AWS.Logs.SubscriptionFilter("advancedFilter", {
  FilterPattern: "{ $.level = \"ERROR\" }",
  LogGroupName: "my-log-group",
  DestinationArn: "arn:aws:kinesis:us-west-2:123456789012:stream/myKinesisStream",
  FilterName: "ErrorFilter",
  Distribution: "ByLogStream"
});
```

## Filtering Specific Log Patterns

Set up a subscription filter to capture logs matching a specific pattern for a Lambda function.

```ts
const lambdaFilter = await AWS.Logs.SubscriptionFilter("lambdaErrorFilter", {
  FilterPattern: "{ $.error = true }",
  LogGroupName: "application-log-group",
  DestinationArn: "arn:aws:lambda:us-west-2:123456789012:function:errorHandler",
  FilterName: "LambdaErrorHandler",
  ApplyOnTransformedLogs: false
});
```

## Streaming Logs to Kinesis

Create a subscription filter that streams log data to a Kinesis stream for real-time processing.

```ts
const kinesisFilter = await AWS.Logs.SubscriptionFilter("kinesisLogFilter", {
  FilterPattern: "[ip, timestamp, request]",
  LogGroupName: "web-application-logs",
  DestinationArn: "arn:aws:kinesis:us-west-2:123456789012:stream/webAppLogsStream",
  FilterName: "WebLogsToKinesis",
  Distribution: "Random"
});
```
