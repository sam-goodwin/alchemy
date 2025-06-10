---
title: Account
description: Learn how to create, update, and manage AWS ApiGateway Accounts using Alchemy Cloud Control.
---


The Account resource lets you manage [AWS ApiGateway Accounts](https://docs.aws.amazon.com/apigateway/latest/userguide/) and their configurations for your API Gateway services.

## Minimal Example

Create a basic ApiGateway account with a CloudWatch role ARN.

```ts
import AWS from "alchemy/aws/control";

const apiGatewayAccount = await AWS.ApiGateway.Account("myApiGatewayAccount", {
  CloudWatchRoleArn: "arn:aws:iam::123456789012:role/ApiGatewayCloudWatchRole"
});
```

## Advanced Configuration

Configure an ApiGateway account with the option to adopt existing resources.

```ts
const apiGatewayAccountWithAdoption = await AWS.ApiGateway.Account("existingApiGatewayAccount", {
  CloudWatchRoleArn: "arn:aws:iam::123456789012:role/ApiGatewayCloudWatchRole",
  adopt: true
});
```

## Monitoring Configuration

Set up an ApiGateway account to enable detailed monitoring with additional CloudWatch settings.

```ts
const monitoredApiGatewayAccount = await AWS.ApiGateway.Account("monitoredApiGatewayAccount", {
  CloudWatchRoleArn: "arn:aws:iam::123456789012:role/ApiGatewayCloudWatchRole",
  adopt: false
});

// Additional monitoring configuration can be set through the AWS Management Console.
```

## Updating an Existing Account

Update an existing ApiGateway account to change the CloudWatch role ARN.

```ts
const updatedApiGatewayAccount = await AWS.ApiGateway.Account("myApiGatewayAccount", {
  CloudWatchRoleArn: "arn:aws:iam::123456789012:role/NewApiGatewayCloudWatchRole",
  adopt: true
});
```
