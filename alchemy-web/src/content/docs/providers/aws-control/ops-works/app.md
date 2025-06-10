---
title: App
description: Learn how to create, update, and manage AWS OpsWorks Apps using Alchemy Cloud Control.
---


The App resource allows you to manage [AWS OpsWorks Apps](https://docs.aws.amazon.com/opsworks/latest/userguide/) and their configuration settings within the AWS ecosystem.

## Minimal Example

Create a basic OpsWorks app with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const myApp = await AWS.OpsWorks.App("myFirstApp", {
  Name: "MyFirstApp",
  StackId: "arn:aws:opsworks:us-west-2:123456789012:stack/abcd1234-56ef-78gh-90ij-klmnopqrst",
  Type: "web",
  EnableSsl: true
});
```

## Advanced Configuration

Configure an OpsWorks app with a custom source and environment variables for more complex applications.

```ts
const advancedApp = await AWS.OpsWorks.App("advancedApp", {
  Name: "AdvancedApp",
  StackId: "arn:aws:opsworks:us-west-2:123456789012:stack/abcd1234-56ef-78gh-90ij-klmnopqrst",
  Type: "web",
  AppSource: {
    Type: "git",
    Url: "https://github.com/myrepo/myapp.git",
    SshKey: "my-ssh-key"
  },
  Environment: [
    { Name: "DATABASE_URL", Value: "mysql://user:pass@hostname:3306/dbname" },
    { Name: "NODE_ENV", Value: "production" }
  ],
  Attributes: {
    "DeployHook": "https://hooks.example.com/deploy"
  }
});
```

## SSL Configuration

Create an OpsWorks app with SSL configuration for secure connections.

```ts
const sslApp = await AWS.OpsWorks.App("sslApp", {
  Name: "SslApp",
  StackId: "arn:aws:opsworks:us-west-2:123456789012:stack/abcd1234-56ef-78gh-90ij-klmnopqrst",
  Type: "web",
  EnableSsl: true,
  SslConfiguration: {
    Certificate: "-----BEGIN CERTIFICATE-----\n...certificate...\n-----END CERTIFICATE-----",
    PrivateKey: "-----BEGIN PRIVATE KEY-----\n...private_key...\n-----END PRIVATE KEY-----",
    Chain: "-----BEGIN CERTIFICATE-----\n...chain...\n-----END CERTIFICATE-----"
  }
});
```

## Multiple Data Sources

Create an OpsWorks app that utilizes multiple data sources for enhanced functionality.

```ts
const multiDataSourceApp = await AWS.OpsWorks.App("multiDataSourceApp", {
  Name: "MultiDataSourceApp",
  StackId: "arn:aws:opsworks:us-west-2:123456789012:stack/abcd1234-56ef-78gh-90ij-klmnopqrst",
  Type: "web",
  DataSources: [
    {
      Type: "database",
      Arn: "arn:aws:rds:us-west-2:123456789012:db:mydatabase",
      DatabaseName: "mydatabase"
    },
    {
      Type: "filesystem",
      Arn: "arn:aws:elasticfilesystem:us-west-2:123456789012:file-system/fs-12345678",
      MountPoint: "/mnt/myfs"
    }
  ]
});
```
