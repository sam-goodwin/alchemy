---
title: EventInvokeConfig
description: Learn how to create, update, and manage AWS Lambda EventInvokeConfigs using Alchemy Cloud Control.
---


The EventInvokeConfig resource allows you to manage the configuration settings for asynchronous invocation of AWS Lambda functions, including retry behavior and destination settings for failed invocations. For more details, refer to the [AWS Lambda EventInvokeConfigs documentation](https://docs.aws.amazon.com/lambda/latest/userguide/).

## Minimal Example

Create a basic EventInvokeConfig with required properties and one optional property for maximum retry attempts.

```ts
import AWS from "alchemy/aws/control";

const basicEventInvokeConfig = await AWS.Lambda.EventInvokeConfig("basicConfig", {
  FunctionName: "myLambdaFunction",
  Qualifier: "v1",
  MaximumRetryAttempts: 2
});
```

## Advanced Configuration

Configure an EventInvokeConfig with additional settings such as destination configuration and maximum event age.

```ts
const advancedEventInvokeConfig = await AWS.Lambda.EventInvokeConfig("advancedConfig", {
  FunctionName: "myLambdaFunction",
  Qualifier: "v1",
  MaximumRetryAttempts: 3,
  MaximumEventAgeInSeconds: 3600,
  DestinationConfig: {
    OnFailure: {
      Destination: "arn:aws:sns:us-west-2:123456789012:my-failure-topic"
    },
    OnSuccess: {
      Destination: "arn:aws:sqs:us-west-2:123456789012:my-success-queue"
    }
  }
});
```

## Custom Retry Strategy

Define a custom retry strategy with specific retry attempts and event age.

```ts
const customRetryEventInvokeConfig = await AWS.Lambda.EventInvokeConfig("customRetryConfig", {
  FunctionName: "myLambdaFunction",
  Qualifier: "v1",
  MaximumRetryAttempts: 5,
  MaximumEventAgeInSeconds: 120,
  DestinationConfig: {
    OnFailure: {
      Destination: "arn:aws:sns:us-west-2:123456789012:my-failure-topic"
    }
  }
});
```

## Adopting Existing Configuration

If you want to adopt an existing EventInvokeConfig instead of failing when it already exists, you can do so by setting the adopt property to true.

```ts
const adoptedEventInvokeConfig = await AWS.Lambda.EventInvokeConfig("adoptedConfig", {
  FunctionName: "myLambdaFunction",
  Qualifier: "v1",
  adopt: true,
  MaximumRetryAttempts: 1
});
```
