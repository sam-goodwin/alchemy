---
title: Managing AWS OpsWorks Apps with Alchemy
description: Learn how to create, update, and manage AWS OpsWorks Apps using Alchemy Cloud Control.
---

# App

The App resource lets you manage [AWS OpsWorks Apps](https://docs.aws.amazon.com/opsworks/latest/userguide/) and their configurations within your OpsWorks stacks.

## Minimal Example

Create a basic OpsWorks app with required properties and a couple of optional ones:

```ts
import AWS from "alchemy/aws/control";

const basicApp = await AWS.OpsWorks.App("MyBasicApp", {
  Name: "MyWebApp",
  StackId: "arn:aws:opsworks:us-east-1:123456789012:stack/abc123",
  Type: "rails",
  EnableSsl: true,
  Domains: ["mywebapp.example.com"]
});
```

## Advanced Configuration

Configure an OpsWorks app with additional settings including environment variables and data sources:

```ts
const advancedApp = await AWS.OpsWorks.App("MyAdvancedApp", {
  Name: "MyAdvancedWebApp",
  StackId: "arn:aws:opsworks:us-east-1:123456789012:stack/abc123",
  Type: "php",
  AppSource: {
    Type: "git",
    Url: "https://github.com/my-org/my-web-app.git",
    SshKey: "my-ssh-key",
    Revision: "main"
  },
  Environment: [
    {
      Key: "APP_ENV",
      Value: "production"
    },
    {
      Key: "DATABASE_URL",
      Value: "mysql://user:password@db.example.com:3306/mydatabase"
    }
  ],
  DataSources: [
    {
      Type: "database",
      Arn: "arn:aws:rds:us-east-1:123456789012:db:mysql-db"
    }
  ]
});
```

## SSL Configuration

Set up an OpsWorks app with SSL configuration to secure communications:

```ts
const sslApp = await AWS.OpsWorks.App("MySslApp", {
  Name: "MySecureWebApp",
  StackId: "arn:aws:opsworks:us-east-1:123456789012:stack/abc123",
  Type: "rails",
  EnableSsl: true,
  SslConfiguration: {
    Certificate: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
    PrivateKey: "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----",
    Chain: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"
  }
});
```

## Multiple Domains

Create an OpsWorks app that can handle multiple domains:

```ts
const multiDomainApp = await AWS.OpsWorks.App("MyMultiDomainApp", {
  Name: "MyMultiDomainWebApp",
  StackId: "arn:aws:opsworks:us-east-1:123456789012:stack/abc123",
  Type: "nodejs",
  Domains: [
    "mywebapp.example.com",
    "www.mywebapp.example.com"
  ]
});
```