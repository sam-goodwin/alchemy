---
title: ChannelNamespace
description: Learn how to create, update, and manage AWS AppSync ChannelNamespaces using Alchemy Cloud Control.
---


The ChannelNamespace resource allows you to create and manage [AWS AppSync ChannelNamespaces](https://docs.aws.amazon.com/appsync/latest/userguide/) for real-time data synchronization and messaging in your applications.

## Minimal Example

Create a basic ChannelNamespace with just the required properties and a common optional property for tags:

```ts
import AWS from "alchemy/aws/control";

const channelNamespace = await AWS.AppSync.ChannelNamespace("myChannelNamespace", {
  apiId: "myApiId",
  name: "myChannelNamespace",
  tags: [{
    key: "Environment",
    value: "Production"
  }]
});
```

## Advanced Configuration

Create a ChannelNamespace with authentication modes for both publishing and subscribing, along with a S3 location for code:

```ts
const advancedChannelNamespace = await AWS.AppSync.ChannelNamespace("advancedChannelNamespace", {
  apiId: "myApiId",
  name: "advancedChannelNamespace",
  publishAuthModes: ["API_KEY", "AMAZON_COGNITO_USER_POOLS"],
  subscribeAuthModes: ["API_KEY"],
  codeS3Location: "s3://my-bucket/my-code.zip",
  handlerConfigs: {
    // Sample handler config structure
    default: {
      handler: "index.handler",
      runtime: "nodejs14.x"
    }
  }
});
```

## Custom Code Handlers

Set up a ChannelNamespace that utilizes custom code handlers to process messages:

```ts
const customHandlerChannelNamespace = await AWS.AppSync.ChannelNamespace("customHandlerChannelNamespace", {
  apiId: "myApiId",
  name: "customHandlerNamespace",
  codeHandlers: "myCustomHandler",
  publishAuthModes: ["OPEN"],
  subscribeAuthModes: ["OPEN"]
});
```

## Adoption of Existing Resource

If you want to adopt an existing ChannelNamespace instead of failing when it already exists, you can set the `adopt` property to true:

```ts
const adoptExistingChannelNamespace = await AWS.AppSync.ChannelNamespace("existingChannelNamespace", {
  apiId: "myApiId",
  name: "existingChannelNamespace",
  adopt: true,
  tags: [{
    key: "Owner",
    value: "TeamA"
  }]
});
```
