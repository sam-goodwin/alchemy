---
title: AppMonitor
description: Learn how to create, update, and manage AWS RUM AppMonitors using Alchemy Cloud Control.
---


The AppMonitor resource lets you create and manage [AWS RUM AppMonitors](https://docs.aws.amazon.com/rum/latest/userguide/) for monitoring the performance of web applications.

## Minimal Example

Create a basic AppMonitor with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const appMonitor = await AWS.RUM.AppMonitor("myAppMonitor", {
  name: "MyWebAppMonitor",
  domain: "mywebapp.com",
  DomainList: ["mywebapp.com", "www.mywebapp.com"],
  CwLogEnabled: true
});
```

## Advanced Configuration

Configure an AppMonitor with a custom events settings and a resource policy.

```ts
const customAppMonitor = await AWS.RUM.AppMonitor("customAppMonitor", {
  name: "CustomWebAppMonitor",
  domain: "customwebapp.com",
  CustomEvents: {
    Events: [
      {
        EventName: "ButtonClick",
        EventType: "click",
        Selector: "#myButton"
      }
    ]
  },
  ResourcePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "rum:PutRumEvents",
        Resource: "*",
        Condition: {
          "StringEquals": {
            "rum:AppMonitor": "CustomWebAppMonitor"
          }
        }
      }
    ]
  }
});
```

## Deobfuscation Configuration

Set up an AppMonitor with deobfuscation configuration for JavaScript error tracking.

```ts
const deobfuscatedAppMonitor = await AWS.RUM.AppMonitor("deobfuscatedAppMonitor", {
  name: "DeobfuscatedWebAppMonitor",
  domain: "deobfuscatedwebapp.com",
  DeobfuscationConfiguration: {
    S3Bucket: "my-deobfuscation-bucket",
    S3KeyPrefix: "deobfuscation/"
  }
});
```

## Tags for Resource Organization

Create an AppMonitor with tags for better resource management.

```ts
const taggedAppMonitor = await AWS.RUM.AppMonitor("taggedAppMonitor", {
  name: "TaggedWebAppMonitor",
  domain: "taggedwebapp.com",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```
