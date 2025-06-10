---
title: AppBlockBuilder
description: Learn how to create, update, and manage AWS AppStream AppBlockBuilders using Alchemy Cloud Control.
---


The AppBlockBuilder resource allows you to create and manage [AWS AppStream AppBlockBuilders](https://docs.aws.amazon.com/appstream/latest/userguide/) for configuring and building application blocks in AWS AppStream.

## Minimal Example

This example demonstrates how to create a basic AppBlockBuilder with required properties and a few optional settings.

```ts
import AWS from "alchemy/aws/control";

const appBlockBuilder = await AWS.AppStream.AppBlockBuilder("basicAppBlockBuilder", {
  name: "BasicAppBlockBuilder",
  platform: "WINDOWS_SERVER_2019",
  vpcConfig: {
    vpcId: "vpc-0abc1234567890def",
    subnets: ["subnet-0abc1234567890def"],
    securityGroupIds: ["sg-0abc1234567890def"]
  },
  instanceType: "stream.standard.medium",
  enableDefaultInternetAccess: true,
  description: "A simple AppBlockBuilder setup for demonstration."
});
```

## Advanced Configuration

This example demonstrates how to configure the AppBlockBuilder with additional options such as IAM role and access endpoints.

```ts
const advancedAppBlockBuilder = await AWS.AppStream.AppBlockBuilder("advancedAppBlockBuilder", {
  name: "AdvancedAppBlockBuilder",
  platform: "WINDOWS_SERVER_2019",
  vpcConfig: {
    vpcId: "vpc-0abc1234567890def",
    subnets: ["subnet-0abc1234567890def"],
    securityGroupIds: ["sg-0abc1234567890def"]
  },
  instanceType: "stream.standard.medium",
  iamRoleArn: "arn:aws:iam::123456789012:role/AppStreamBuilderRole",
  accessEndpoints: [{
    endpointType: "STREAMING",
    vpceId: "vpce-0abc1234567890def"
  }],
  appBlockArns: [
    "arn:aws:appstream:us-west-2:123456789012:app-block/my-app-block"
  ],
  tags: [
    { key: "Project", value: "Demo" },
    { key: "Environment", value: "Development" }
  ]
});
```

## Using Multiple AppBlockBuilders

In this example, we create multiple AppBlockBuilders for different applications, showcasing how to manage them efficiently.

```ts
const appBlockBuilderForAppA = await AWS.AppStream.AppBlockBuilder("appABlockBuilder", {
  name: "AppABlockBuilder",
  platform: "WINDOWS_SERVER_2019",
  vpcConfig: {
    vpcId: "vpc-0abc1234567890def",
    subnets: ["subnet-0abc1234567890def"],
    securityGroupIds: ["sg-0abc1234567890def"]
  },
  instanceType: "stream.standard.medium",
  description: "AppBlockBuilder for Application A."
});

const appBlockBuilderForAppB = await AWS.AppStream.AppBlockBuilder("appBBlockBuilder", {
  name: "AppBBlockBuilder",
  platform: "WINDOWS_SERVER_2019",
  vpcConfig: {
    vpcId: "vpc-0abc1234567890def",
    subnets: ["subnet-0abc1234567890def"],
    securityGroupIds: ["sg-0abc1234567890def"]
  },
  instanceType: "stream.standard.medium",
  description: "AppBlockBuilder for Application B.",
  enableDefaultInternetAccess: false
});
```

This documentation provides a comprehensive overview of how to utilize the AppBlockBuilder resource with practical examples to help you get started effectively.
