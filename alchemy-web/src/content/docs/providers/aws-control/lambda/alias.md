---
title: Alias
description: Learn how to create, update, and manage AWS Lambda Aliases using Alchemy Cloud Control.
---


The Alias resource allows you to manage [AWS Lambda Aliases](https://docs.aws.amazon.com/lambda/latest/userguide/) which provide the ability to create a pointer to a specific version of a Lambda function, enabling you to manage and deploy different versions easily.

## Minimal Example

Create a basic Lambda alias pointing to a specific function version.

```ts
import AWS from "alchemy/aws/control";

const lambdaAlias = await AWS.Lambda.Alias("myLambdaAlias", {
  FunctionName: "myLambdaFunction",
  FunctionVersion: "1",
  Name: "production",
  Description: "Alias for production version of the Lambda function"
});
```

## Advanced Configuration

Configure a Lambda alias with provisioned concurrency settings for performance optimization.

```ts
const optimizedLambdaAlias = await AWS.Lambda.Alias("myOptimizedLambdaAlias", {
  FunctionName: "myLambdaFunction",
  FunctionVersion: "2",
  Name: "staging",
  Description: "Alias for staging version of the Lambda function",
  ProvisionedConcurrencyConfig: {
    ProvisionedConcurrentExecutions: 5
  }
});
```

## Routing Configuration

Create a Lambda alias with routing configuration to split traffic between two function versions.

```ts
const trafficRoutingLambdaAlias = await AWS.Lambda.Alias("myTrafficRoutingLambdaAlias", {
  FunctionName: "myLambdaFunction",
  FunctionVersion: "1",
  Name: "beta",
  Description: "Alias for beta version of the Lambda function",
  RoutingConfig: {
    AdditionalVersionWeights: {
      "2": 0.2 // 20% of the traffic goes to version 2
    }
  }
});
```

## Adoption of Existing Resource

Create a Lambda alias that adopts an existing resource instead of failing if the resource already exists.

```ts
const adoptedLambdaAlias = await AWS.Lambda.Alias("myAdoptedLambdaAlias", {
  FunctionName: "myLambdaFunction",
  FunctionVersion: "3",
  Name: "adopted",
  Description: "Adopt existing Lambda alias",
  adopt: true
});
```
