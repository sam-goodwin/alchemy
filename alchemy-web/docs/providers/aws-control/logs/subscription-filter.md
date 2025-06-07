---
title: Managing AWS Logs SubscriptionFilters with Alchemy
description: Learn how to create, update, and manage AWS Logs SubscriptionFilters using Alchemy Cloud Control.
---

# SubscriptionFilter

The SubscriptionFilter resource lets you manage [AWS Logs SubscriptionFilters](https://docs.aws.amazon.com/logs/latest/userguide/) for filtering log events in your AWS CloudWatch Logs.

## Minimal Example

Create a basic subscription filter that captures all logs from a specified log group.

```ts
import AWS from "alchemy/aws/control";

const BasicSubscriptionFilter = await AWS.Logs.SubscriptionFilter("BasicFilter", {
  LogGroupName: "MyLogGroup",
  FilterPattern: "{ $.level = * }",
  DestinationArn: "arn:aws:lambda:us-west-2:123456789012:function:MyLambdaFunction",
  FilterName: "BasicFilter"
});
```

## Advanced Configuration

Create a subscription filter with additional options such as applying on transformed logs.

```ts
const AdvancedSubscriptionFilter = await AWS.Logs.SubscriptionFilter("AdvancedFilter", {
  LogGroupName: "MyLogGroup",
  FilterPattern: "{ $.level = ERROR }",
  DestinationArn: "arn:aws:lambda:us-west-2:123456789012:function:MyLambdaFunction",
  ApplyOnTransformedLogs: true,
  Distribution: "ByLogStream"
});
```

## Using IAM Role for Permissions

Configure a subscription filter that uses an IAM role for permissions.

```ts
const RoleBasedSubscriptionFilter = await AWS.Logs.SubscriptionFilter("RoleBasedFilter", {
  LogGroupName: "MyLogGroup",
  FilterPattern: "{ $.level = WARN }",
  DestinationArn: "arn:aws:lambda:us-west-2:123456789012:function:MyLambdaFunction",
  RoleArn: "arn:aws:iam::123456789012:role/MyLambdaExecutionRole"
});
```

## Adoption of Existing Resources

If you want to adopt an existing subscription filter instead of creating a new one, you can set the `adopt` property.

```ts
const AdoptExistingFilter = await AWS.Logs.SubscriptionFilter("AdoptExistingFilter", {
  LogGroupName: "MyLogGroup",
  FilterPattern: "{ $.level = INFO }",
  DestinationArn: "arn:aws:lambda:us-west-2:123456789012:function:MyExistingLambdaFunction",
  adopt: true
});
```